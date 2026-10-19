// A deliberately tiny, read-only SQL engine for the homepage console.
// Supports: SELECT cols|*|COUNT(*) FROM t [WHERE c = 'v' | c LIKE '%v%' | c != 'v']
//           [ORDER BY c [ASC|DESC]] [LIMIT n], DESCRIBE t, HELP / SHOW TABLES.

import { apps, education, life, otherBuilds, work } from "./content";

export type Table = { name: string; about: string; columns: string[]; rows: string[][] };

export type QueryResult =
  | { kind: "rows"; columns: string[]; rows: string[][]; comment?: string }
  | { kind: "error"; code: string; message: string; hint?: string };

const SKILLS: [string, string][] = [
  ["Oracle 11g, 12c, 19c", "DATABASES"],
  ["SQL", "DATABASES"],
  ["PostgreSQL", "DATABASES"],
  ["Supabase", "DATABASES"],
  ["Python", "AUTOMATION"],
  ["Bash", "AUTOMATION"],
  ["Ansible", "AUTOMATION"],
  ["Linux", "AUTOMATION"],
  ["Rubrik backups", "AUTOMATION"],
  ["GraphQL APIs", "AUTOMATION"],
  ["React Native", "APPS"],
  ["Expo", "APPS"],
  ["Swift and SwiftUI", "APPS"],
  ["Next.js", "APPS"],
  ["TypeScript", "APPS"],
  ["Claude Code", "AI"],
  ["OpenAI API", "AI"],
  ["N8N workflows", "AI"],
];

export const TABLES: Table[] = [
  {
    name: "people",
    about: "Who I am",
    columns: ["name", "role", "employer", "location", "uptime", "apps"],
    rows: [
      [
        "Seán Hogan",
        "Oracle Database Administrator",
        "JRI America, Tralee",
        "Co. Kerry, Ireland",
        "6 years in production",
        "2 live, 1 in development",
      ],
    ],
  },
  {
    name: "work",
    about: "Where I work",
    columns: ["role", "company", "location", "period"],
    rows: work.map((w) => [w.role, w.org, w.place, w.period]),
  },
  {
    name: "education",
    about: "Where I studied",
    columns: ["degree", "institution", "period"],
    rows: [[education.degree, education.org, education.period]],
  },
  {
    name: "apps",
    about: "What I've shipped",
    columns: ["name", "status", "stack"],
    rows: apps.map((a) => [a.name, a.status === "live" ? "LIVE" : "BUILDING", a.stack.join(", ")]),
  },
  {
    name: "builds",
    about: "Other things I've built",
    columns: ["name", "stack"],
    rows: otherBuilds.map((b) => [b.name, b.stack.join(", ")]),
  },
  {
    name: "skills",
    about: "What I work with",
    columns: ["skill", "area"],
    rows: SKILLS.map(([s, a]) => [s, a]),
  },
  {
    name: "life",
    about: "Away from the keyboard",
    columns: ["activity", "detail"],
    rows: life.map((l) => [l.activity, l.detail]),
  },
  {
    name: "coffee",
    about: "Essential infrastructure",
    columns: ["brew_method", "nullable"],
    rows: [["French press", "NO"]],
  },
];

const byName = (name: string) => TABLES.find((t) => t.name === name.toLowerCase());
const tableList = TABLES.map((t) => t.name).join(", ");

const helpResult = (): QueryResult => ({
  kind: "rows",
  columns: ["TABLE_NAME", "COLUMNS"],
  rows: TABLES.map((t) => [t.name.toUpperCase(), t.columns.join(", ")]),
  comment: "-- Try: SELECT name, status FROM apps WHERE status = 'LIVE';",
});

function likeToRegex(pattern: string) {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/%/g, ".*").replace(/_/g, ".");
  return new RegExp(`^${escaped}$`, "i");
}

const SELECT_RE =
  /^select\s+(.+?)\s+from\s+([a-z_][a-z0-9_]*)(?:\s+where\s+([a-z_][a-z0-9_]*)\s*(=|!=|<>|like)\s*'([^']*)')?(?:\s+order\s+by\s+([a-z_][a-z0-9_]*)(?:\s+(asc|desc))?)?(?:\s+limit\s+(\d+))?$/i;

export function runQuery(input: string): QueryResult {
  const sql = input.trim().replace(/;+\s*$/, "").replace(/\s+/g, " ");

  if (!sql) return { kind: "error", code: "SP2-0042", message: "unknown command", hint: "Type HELP to get started." };

  if (/\b(drop|delete|truncate|update|alter|grant|insert|create|merge)\b/i.test(sql)) {
    return {
      kind: "error",
      code: "ORA-01031",
      message: "insufficient privileges",
      hint: "Nice try. This is production. Read-only for guests.",
    };
  }

  if (/^(help|show tables|select \* from (tab|all_tables|user_tables))$/i.test(sql)) return helpResult();

  const desc = sql.match(/^desc(?:ribe)?\s+([a-z_][a-z0-9_]*)$/i);
  if (desc) {
    const t = byName(desc[1]);
    if (!t) return missingTable(desc[1]);
    return {
      kind: "rows",
      columns: ["NAME", "TYPE"],
      rows: t.columns.map((c) => [c.toUpperCase(), "VARCHAR2"]),
      comment: `-- ${t.about}. Try: SELECT ${t.columns[0]} FROM ${t.name};`,
    };
  }

  const m = sql.match(SELECT_RE);
  if (!m) {
    return {
      kind: "error",
      code: "ORA-00900",
      message: "invalid SQL statement",
      hint: "This console speaks SELECT, DESCRIBE and HELP.",
    };
  }

  const [, colList, tableName, whereCol, op, whereVal, orderCol, orderDir, limit] = m;
  const t = byName(tableName);
  if (!t) return missingTable(tableName);

  const colIndex = (c: string) => t.columns.indexOf(c.toLowerCase());
  const badColumn = (c: string): QueryResult => ({
    kind: "error",
    code: "ORA-00904",
    message: `"${c.toUpperCase()}": invalid identifier`,
    hint: `Columns in ${t.name}: ${t.columns.join(", ")}`,
  });

  let rows = [...t.rows];

  if (whereCol) {
    const i = colIndex(whereCol);
    if (i < 0) return badColumn(whereCol);
    const o = op.toLowerCase();
    if (o === "like") {
      const re = likeToRegex(whereVal);
      rows = rows.filter((r) => re.test(r[i]));
    } else {
      const eq = (r: string[]) => r[i].toLowerCase() === whereVal.toLowerCase();
      rows = rows.filter((r) => (o === "=" ? eq(r) : !eq(r)));
    }
  }

  if (orderCol) {
    const i = colIndex(orderCol);
    if (i < 0) return badColumn(orderCol);
    const dir = orderDir?.toLowerCase() === "desc" ? -1 : 1;
    rows.sort((a, b) => a[i].localeCompare(b[i]) * dir);
  }

  if (limit) rows = rows.slice(0, Number(limit));

  const cols = colList.split(",").map((c) => c.trim());
  if (cols.length === 1 && /^count\(\s*\*\s*\)$/i.test(cols[0])) {
    return { kind: "rows", columns: ["COUNT(*)"], rows: [[String(rows.length)]] };
  }

  let indexes: number[];
  if (cols.length === 1 && cols[0] === "*") {
    indexes = t.columns.map((_, i) => i);
  } else {
    indexes = [];
    for (const c of cols) {
      const i = colIndex(c);
      if (i < 0) return badColumn(c);
      indexes.push(i);
    }
  }

  return {
    kind: "rows",
    columns: indexes.map((i) => t.columns[i].toUpperCase()),
    rows: rows.map((r) => indexes.map((i) => r[i])),
  };
}

function missingTable(name: string): QueryResult {
  return {
    kind: "error",
    code: "ORA-00942",
    message: `table or view "${name.toUpperCase()}" does not exist`,
    hint: `Tables you can query: ${tableList}`,
  };
}
