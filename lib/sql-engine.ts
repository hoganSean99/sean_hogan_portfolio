// A small, read-only SQL engine for the homepage console and terminal.
//
// Supported:
//   SELECT [DISTINCT] items FROM t [alias]
//     { [INNER | LEFT [OUTER]] JOIN t [alias] ON a.col = b.col }
//     [WHERE cond { AND | OR cond }]
//     [GROUP BY col {, col}]
//     [ORDER BY col | alias | position [ASC | DESC] {, ...}]
//     [LIMIT n | FETCH FIRST n ROWS ONLY]
//   items: *, t.*, col, t.col [AS alias], COUNT(*), COUNT(col)
//   cond:  operand (= | != | <> | < | > | <= | >= | LIKE | NOT LIKE) operand, operand IS [NOT] NULL
//   DESCRIBE t, HELP, SHOW TABLES
// Everything else is refused with a real Oracle error code.

import { apps, education, life, otherBuilds, work } from "./content";

export type Value = string | number | null;

type Column = {
  name: string;
  type: "NUMBER" | "VARCHAR2";
  pk?: boolean;
  fk?: { table: string; column: string };
  notNull?: boolean;
};

export type Table = { name: string; about: string; columns: Column[]; rows: Value[][]; hidden?: boolean };

export type QueryResult =
  | { kind: "rows"; columns: string[]; rows: string[][]; comment?: string }
  | { kind: "error"; code: string; message: string; hint?: string };

/* ------------------------------------------------------------------ */
/* Schema and data                                                     */
/* ------------------------------------------------------------------ */

const num = (name: string, extra: Partial<Column> = {}): Column => ({ name, type: "NUMBER", ...extra });
const str = (name: string, extra: Partial<Column> = {}): Column => ({ name, type: "VARCHAR2", ...extra });
const pk = (name: string) => num(name, { pk: true, notNull: true });
const fk = (name: string, table: string, column: string) => num(name, { fk: { table, column }, notNull: true });
const personFk = () => fk("person_id", "people", "person_id");

const SEAN = 1;
const host = (url?: string) => url?.replace(/^https?:\/\/(www\.)?/, "") ?? null;

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

const appRows = apps.map((a, i) => [i + 1, SEAN, a.name, a.status === "live" ? "LIVE" : "BUILDING", host(a.website)]);

const BASE_TABLES: Table[] = [
  {
    name: "people",
    about: "Who I am",
    columns: [pk("person_id"), str("name", { notNull: true }), str("role"), str("employer"), str("location"), str("uptime")],
    rows: [[SEAN, "Seán Hogan", "Oracle Database Administrator", "JRI America, Tralee", "Co. Kerry, Ireland", "6 years in production"]],
  },
  {
    name: "work",
    about: "Where I work",
    columns: [pk("work_id"), personFk(), str("role"), str("company"), str("location"), str("period")],
    rows: work.map((w, i) => [i + 1, SEAN, w.role, w.org, w.place, w.period]),
  },
  {
    name: "education",
    about: "Where I studied",
    columns: [pk("education_id"), personFk(), str("degree"), str("institution"), str("period")],
    rows: [[1, SEAN, education.degree, education.org, education.period]],
  },
  {
    name: "apps",
    about: "What I've shipped",
    columns: [pk("app_id"), personFk(), str("name", { notNull: true }), str("status"), str("website")],
    rows: appRows,
  },
  {
    name: "app_stack",
    about: "One row per technology per app",
    columns: [fk("app_id", "apps", "app_id"), str("tech", { notNull: true })],
    rows: apps.flatMap((a, i) => a.stack.map((t) => [i + 1, t] as Value[])),
  },
  {
    name: "store_listings",
    about: "App Store pages, for the apps that have one",
    columns: [pk("listing_id"), fk("app_id", "apps", "app_id"), str("store"), str("url")],
    rows: apps
      .map((a, i) => ({ a, id: i + 1 }))
      .filter(({ a }) => a.appStore)
      .map(({ a, id }, n) => [n + 1, id, "App Store (iOS)", a.appStore!.replace(/^https:\/\//, "")]),
  },
  {
    name: "builds",
    about: "Other things I've built",
    columns: [pk("build_id"), personFk(), str("name"), str("stack")],
    rows: otherBuilds.map((b, i) => [i + 1, SEAN, b.name, b.stack.join(", ")]),
  },
  {
    name: "skills",
    about: "What I work with",
    columns: [pk("skill_id"), personFk(), str("skill"), str("area")],
    rows: SKILLS.map(([s, area], i) => [i + 1, SEAN, s, area]),
  },
  {
    name: "life",
    about: "Away from the keyboard",
    columns: [pk("life_id"), personFk(), str("activity"), str("detail")],
    rows: life.map((l, i) => [i + 1, SEAN, l.activity, l.detail]),
  },
  {
    name: "coffee",
    about: "Essential infrastructure",
    columns: [personFk(), str("brew_method", { notNull: true })],
    rows: [[SEAN, "French press"]],
  },
];

const constraintsTable: Table = {
  name: "user_constraints",
  about: "Every primary and foreign key",
  hidden: true,
  columns: [str("table_name"), str("constraint_type"), str("column_name"), str("references")],
  rows: BASE_TABLES.flatMap((t) =>
    t.columns
      .filter((c) => c.pk || c.fk)
      .map((c) => [
        t.name.toUpperCase(),
        c.pk ? "PRIMARY KEY" : "FOREIGN KEY",
        c.name.toUpperCase(),
        c.fk ? `${c.fk.table.toUpperCase()}.${c.fk.column.toUpperCase()}` : null,
      ])
  ),
};

const tablesTable: Table = {
  name: "user_tables",
  about: "Every table",
  hidden: true,
  columns: [str("table_name"), str("about")],
  rows: BASE_TABLES.map((t) => [t.name.toUpperCase(), t.about]),
};

export const TABLES: Table[] = [...BASE_TABLES, constraintsTable, tablesTable];
export const JOIN_EXAMPLE =
  "SELECT a.name, s.tech FROM apps a JOIN app_stack s ON a.app_id = s.app_id WHERE s.tech = 'Supabase';";

const findTable = (name: string) => {
  const n = name.toLowerCase();
  if (n === "tab" || n === "all_tables") return tablesTable;
  if (n === "all_constraints") return constraintsTable;
  return TABLES.find((t) => t.name === n);
};

/* ------------------------------------------------------------------ */
/* Errors                                                              */
/* ------------------------------------------------------------------ */

class SqlError extends Error {
  constructor(public code: string, message: string, public hint?: string) {
    super(message);
  }
}
const visibleTables = () =>
  BASE_TABLES.map((t) => t.name).join(", ");

/* ------------------------------------------------------------------ */
/* Tokenizer                                                           */
/* ------------------------------------------------------------------ */

type Tok =
  | { t: "id"; v: string; raw: string }
  | { t: "num"; v: number }
  | { t: "str"; v: string }
  | { t: "sym"; v: string };

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (c === "-" && src[i + 1] === "-") break; // trailing comment
    if (c === "'") {
      let j = i + 1;
      let s = "";
      while (true) {
        if (j >= src.length) throw new SqlError("ORA-01756", "quoted string not properly terminated");
        if (src[j] === "'" && src[j + 1] === "'") {
          s += "'";
          j += 2;
        } else if (src[j] === "'") break;
        else s += src[j++];
      }
      out.push({ t: "str", v: s });
      i = j + 1;
      continue;
    }
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j])) j++;
      out.push({ t: "num", v: Number(src.slice(i, j)) });
      i = j;
      continue;
    }
    if (/[A-Za-z_$"]/.test(c)) {
      if (c === '"') {
        const end = src.indexOf('"', i + 1);
        if (end < 0) throw new SqlError("ORA-01740", "missing double quote in identifier");
        const raw = src.slice(i + 1, end);
        out.push({ t: "id", v: raw.toLowerCase(), raw });
        i = end + 1;
        continue;
      }
      let j = i;
      while (j < src.length && /[A-Za-z0-9_$]/.test(src[j])) j++;
      const raw = src.slice(i, j);
      out.push({ t: "id", v: raw.toLowerCase(), raw });
      i = j;
      continue;
    }
    const two = src.slice(i, i + 2);
    if (["!=", "<>", "<=", ">="].includes(two)) {
      out.push({ t: "sym", v: two });
      i += 2;
      continue;
    }
    if (",.()*=<>;".includes(c)) {
      out.push({ t: "sym", v: c });
      i++;
      continue;
    }
    throw new SqlError("ORA-00911", "invalid character", `Unexpected "${c}".`);
  }
  while (out.length && out[out.length - 1].t === "sym" && out[out.length - 1].v === ";") out.pop();
  return out;
}

/* ------------------------------------------------------------------ */
/* Parser                                                              */
/* ------------------------------------------------------------------ */

type ColRef = { table?: string; column: string };
type Operand = { ref: ColRef } | { lit: Value };
type Cond =
  | { op: "and" | "or"; left: Cond; right: Cond }
  | { op: "cmp"; cmp: string; left: Operand; right: Operand }
  | { op: "null"; not: boolean; operand: Operand };
type Item =
  | { kind: "star"; table?: string }
  | { kind: "col"; ref: ColRef; alias?: string }
  | { kind: "count"; ref?: ColRef; alias?: string };
type Source = { table: Table; alias: string };
type Join = { type: "inner" | "left"; source: Source; on: Cond };
type OrderKey = { key: ColRef | number; desc: boolean };
type Select = {
  distinct: boolean;
  items: Item[];
  from: Source;
  joins: Join[];
  where?: Cond;
  groupBy: ColRef[];
  orderBy: OrderKey[];
  limit?: number;
};

const RESERVED = new Set([
  "select", "from", "where", "join", "inner", "left", "outer", "on", "and", "or", "order", "by",
  "group", "limit", "fetch", "as", "asc", "desc", "is", "not", "null", "like", "distinct",
]);

class Parser {
  private i = 0;
  constructor(private toks: Tok[]) {}

  private peek(o = 0) {
    return this.toks[this.i + o];
  }
  private isKw(v: string, o = 0) {
    const t = this.peek(o);
    return t?.t === "id" && t.v === v;
  }
  private isSym(v: string) {
    const t = this.peek();
    return t?.t === "sym" && t.v === v;
  }
  private takeKw(v: string) {
    if (this.isKw(v)) {
      this.i++;
      return true;
    }
    return false;
  }
  private takeSym(v: string) {
    if (this.isSym(v)) {
      this.i++;
      return true;
    }
    return false;
  }
  private expectKw(v: string, code = "ORA-00936", msg = "missing expression") {
    if (!this.takeKw(v)) throw new SqlError(code, msg, `Expected ${v.toUpperCase()}.`);
  }
  private ident(what = "identifier"): string {
    const t = this.peek();
    if (t?.t === "id" && !RESERVED.has(t.v)) {
      this.i++;
      return t.v;
    }
    throw new SqlError("ORA-00936", "missing expression", `Expected a ${what}.`);
  }
  get done() {
    return this.i >= this.toks.length;
  }

  parseSelect(): Select {
    this.expectKw("select", "ORA-00900", "invalid SQL statement");
    const distinct = this.takeKw("distinct");
    const items: Item[] = [this.item()];
    while (this.takeSym(",")) items.push(this.item());
    if (!this.takeKw("from")) throw new SqlError("ORA-00923", "FROM keyword not found where expected");
    const from = this.source();
    const joins: Join[] = [];
    while (true) {
      let type: "inner" | "left" | null = null;
      if (this.isKw("join")) type = "inner";
      else if (this.isKw("inner") && this.isKw("join", 1)) {
        this.i++;
        type = "inner";
      } else if (this.isKw("left")) {
        this.i++;
        this.takeKw("outer");
        if (!this.isKw("join")) throw new SqlError("ORA-00905", "missing keyword", "Expected JOIN.");
        type = "left";
      }
      if (!type) break;
      this.expectKw("join");
      const source = this.source();
      if (!this.takeKw("on")) throw new SqlError("ORA-00905", "missing keyword", "A JOIN needs an ON condition.");
      joins.push({ type, source, on: this.cond() });
    }
    const where = this.takeKw("where") ? this.cond() : undefined;
    const groupBy: ColRef[] = [];
    if (this.takeKw("group")) {
      this.expectKw("by", "ORA-00924", "missing BY keyword");
      groupBy.push(this.colRef());
      while (this.takeSym(",")) groupBy.push(this.colRef());
    }
    const orderBy: OrderKey[] = [];
    if (this.takeKw("order")) {
      this.expectKw("by", "ORA-00924", "missing BY keyword");
      do {
        const t = this.peek();
        const key: ColRef | number = t?.t === "num" ? (this.i++, t.v) : this.colRef();
        const desc = this.takeKw("desc") ? true : (this.takeKw("asc"), false);
        orderBy.push({ key, desc });
      } while (this.takeSym(","));
    }
    let limit: number | undefined;
    if (this.takeKw("limit")) limit = this.number();
    else if (this.takeKw("fetch")) {
      if (!this.takeKw("first")) this.expectKw("next", "ORA-00905", "missing keyword");
      limit = this.number();
      if (!this.takeKw("rows")) this.expectKw("row", "ORA-00905", "missing keyword");
      this.expectKw("only", "ORA-00905", "missing keyword");
    }
    if (!this.done) throw new SqlError("ORA-00933", "SQL command not properly ended");
    return { distinct, items, from, joins, where, groupBy, orderBy, limit };
  }

  private number() {
    const t = this.peek();
    if (t?.t !== "num") throw new SqlError("ORA-00936", "missing expression", "Expected a number.");
    this.i++;
    return t.v;
  }

  private source(): Source {
    const name = this.ident("table name");
    const table = findTable(name);
    if (!table) {
      throw new SqlError("ORA-00942", "table or view does not exist", `Tables you can query: ${visibleTables()}`);
    }
    this.takeKw("as");
    const t = this.peek();
    const alias = t?.t === "id" && !RESERVED.has(t.v) && !["first", "next"].includes(t.v) ? (this.i++, t.v) : name;
    return { table, alias };
  }

  private alias(): string | undefined {
    if (this.takeKw("as")) return this.ident("column alias");
    const t = this.peek();
    if (t?.t === "id" && !RESERVED.has(t.v)) {
      this.i++;
      return t.v;
    }
    return undefined;
  }

  private item(): Item {
    if (this.takeSym("*")) return { kind: "star" };
    if (this.isKw("count") && this.toks[this.i + 1]?.t === "sym" && (this.toks[this.i + 1] as { v: string }).v === "(") {
      this.i += 2;
      let ref: ColRef | undefined;
      if (!this.takeSym("*")) ref = this.colRef();
      if (!this.takeSym(")")) throw new SqlError("ORA-00907", "missing right parenthesis");
      return { kind: "count", ref, alias: this.alias() };
    }
    const first = this.ident("column name");
    if (this.takeSym(".")) {
      if (this.takeSym("*")) return { kind: "star", table: first };
      return { kind: "col", ref: { table: first, column: this.ident("column name") }, alias: this.alias() };
    }
    return { kind: "col", ref: { column: first }, alias: this.alias() };
  }

  private colRef(): ColRef {
    const first = this.ident("column name");
    if (this.takeSym(".")) return { table: first, column: this.ident("column name") };
    return { column: first };
  }

  private operand(): Operand {
    const t = this.peek();
    if (t?.t === "str") return this.i++, { lit: t.v };
    if (t?.t === "num") return this.i++, { lit: t.v };
    if (this.takeKw("null")) return { lit: null };
    return { ref: this.colRef() };
  }

  private cond(): Cond {
    let left = this.andCond();
    while (this.takeKw("or")) left = { op: "or", left, right: this.andCond() };
    return left;
  }
  private andCond(): Cond {
    let left = this.predicate();
    while (this.takeKw("and")) left = { op: "and", left, right: this.predicate() };
    return left;
  }
  private predicate(): Cond {
    if (this.isSym("(")) {
      this.i++;
      const c = this.cond();
      if (!this.takeSym(")")) throw new SqlError("ORA-00907", "missing right parenthesis");
      return c;
    }
    const left = this.operand();
    if (this.takeKw("is")) {
      const not = this.takeKw("not");
      this.expectKw("null", "ORA-00908", "missing NULL keyword");
      return { op: "null", not, operand: left };
    }
    let cmp: string;
    if (this.takeKw("not")) {
      this.expectKw("like", "ORA-00920", "invalid relational operator");
      cmp = "not like";
    } else if (this.takeKw("like")) cmp = "like";
    else {
      const t = this.peek();
      if (t?.t !== "sym" || !["=", "!=", "<>", "<", ">", "<=", ">="].includes(t.v)) {
        throw new SqlError("ORA-00920", "invalid relational operator");
      }
      this.i++;
      cmp = t.v;
    }
    return { op: "cmp", cmp, left, right: this.operand() };
  }
}

/* ------------------------------------------------------------------ */
/* Executor                                                            */
/* ------------------------------------------------------------------ */

type Row = Map<string, Value>; // key: "alias.column"

function resolver(sources: Source[]) {
  return (ref: ColRef): string => {
    if (ref.table) {
      const s = sources.find((x) => x.alias === ref.table);
      if (!s || !s.table.columns.some((c) => c.name === ref.column)) {
        throw new SqlError("ORA-00904", `"${ref.table.toUpperCase()}"."${ref.column.toUpperCase()}": invalid identifier`, hintFor(sources, ref));
      }
      return `${s.alias}.${ref.column}`;
    }
    const hits = sources.filter((s) => s.table.columns.some((c) => c.name === ref.column));
    if (hits.length === 0) {
      throw new SqlError("ORA-00904", `"${ref.column.toUpperCase()}": invalid identifier`, hintFor(sources, ref));
    }
    if (hits.length > 1) {
      throw new SqlError(
        "ORA-00918",
        "column ambiguously defined",
        `${ref.column} exists in ${hits.map((h) => h.alias).join(" and ")}. Prefix it, e.g. ${hits[0].alias}.${ref.column}`
      );
    }
    return `${hits[0].alias}.${ref.column}`;
  };
}

function hintFor(sources: Source[], ref: ColRef) {
  const s = ref.table ? sources.find((x) => x.alias === ref.table) : undefined;
  if (ref.table && !s) return `No table or alias called ${ref.table} in this query.`;
  return sources.map((x) => `${x.alias}: ${x.table.columns.map((c) => c.name).join(", ")}`).join(" | ");
}

const isNum = (v: Value): v is number => typeof v === "number";

function compare(a: Value, b: Value): number {
  if (isNum(a) && isNum(b)) return a - b;
  return String(a).localeCompare(String(b), undefined, { sensitivity: "base" });
}

function likeRe(pattern: string) {
  const esc = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/%/g, ".*").replace(/_/g, ".");
  return new RegExp(`^${esc}$`, "i");
}

function evalCond(c: Cond, row: Row, resolve: (r: ColRef) => string): boolean {
  const val = (o: Operand): Value => ("lit" in o ? o.lit : row.get(resolve(o.ref)) ?? null);
  switch (c.op) {
    case "and":
      return evalCond(c.left, row, resolve) && evalCond(c.right, row, resolve);
    case "or":
      return evalCond(c.left, row, resolve) || evalCond(c.right, row, resolve);
    case "null": {
      const isNull = val(c.operand) === null;
      return c.not ? !isNull : isNull;
    }
    case "cmp": {
      const a = val(c.left);
      const b = val(c.right);
      if (a === null || b === null) return false; // SQL: comparisons with NULL are never true
      if (c.cmp === "like") return likeRe(String(b)).test(String(a));
      if (c.cmp === "not like") return !likeRe(String(b)).test(String(a));
      const d = isNum(a) && isNum(b) ? a - b : String(a).toLowerCase().localeCompare(String(b).toLowerCase());
      switch (c.cmp) {
        case "=":
          return d === 0;
        case "!=":
        case "<>":
          return d !== 0;
        case "<":
          return d < 0;
        case ">":
          return d > 0;
        case "<=":
          return d <= 0;
        default:
          return d >= 0;
      }
    }
  }
}

function tableRows(s: Source): Row[] {
  return s.table.rows.map((r) => new Map(s.table.columns.map((c, i) => [`${s.alias}.${c.name}`, r[i]])));
}

function execute(q: Select): { columns: string[]; rows: Value[][] } {
  const sources = [q.from, ...q.joins.map((j) => j.source)];
  const aliases = new Set<string>();
  for (const s of sources) {
    if (aliases.has(s.alias)) {
      throw new SqlError("ORA-00918", "column ambiguously defined", `The alias ${s.alias} is used twice. Give each table its own alias.`);
    }
    aliases.add(s.alias);
  }
  const resolve = resolver(sources);

  // FROM and JOINs (nested loops; the tables are tiny)
  let rows = tableRows(q.from);
  q.joins.forEach((j, idx) => {
    const visible = resolver(sources.slice(0, idx + 2));
    const right = tableRows(j.source);
    const next: Row[] = [];
    for (const l of rows) {
      let matched = false;
      for (const r of right) {
        const merged = new Map([...l, ...r]);
        if (evalCond(j.on, merged, visible)) {
          next.push(merged);
          matched = true;
        }
      }
      if (!matched && j.type === "left") {
        const nulls = new Map(l);
        j.source.table.columns.forEach((c) => nulls.set(`${j.source.alias}.${c.name}`, null));
        next.push(nulls);
      }
    }
    rows = next;
  });

  if (q.where) rows = rows.filter((r) => evalCond(q.where!, r, resolve));

  // Expand the select list
  type Out = { name: string; get: (row: Row, group: Row[]) => Value; key?: string; aggregate: boolean };
  const outs: Out[] = [];
  for (const item of q.items) {
    if (item.kind === "star") {
      const targets = item.table ? sources.filter((s) => s.alias === item.table) : sources;
      if (item.table && targets.length === 0) {
        throw new SqlError("ORA-00904", `"${item.table.toUpperCase()}": invalid identifier`, `No table or alias called ${item.table}.`);
      }
      for (const s of targets) {
        for (const c of s.table.columns) {
          const key = `${s.alias}.${c.name}`;
          outs.push({ name: c.name.toUpperCase(), key, aggregate: false, get: (r) => r.get(key) ?? null });
        }
      }
    } else if (item.kind === "col") {
      const key = resolve(item.ref);
      outs.push({
        name: (item.alias ?? item.ref.column).toUpperCase(),
        key,
        aggregate: false,
        get: (r) => r.get(key) ?? null,
      });
    } else {
      const key = item.ref ? resolve(item.ref) : undefined;
      outs.push({
        name: (item.alias ?? (item.ref ? `COUNT(${item.ref.column})` : "COUNT(*)")).toUpperCase(),
        aggregate: true,
        get: (_r, group) => (key ? group.filter((g) => g.get(key) !== null).length : group.length),
      });
    }
  }

  const hasAgg = outs.some((o) => o.aggregate);
  const groupKeys = q.groupBy.map(resolve);
  let produced: { out: Value[]; src: Row }[];

  if (hasAgg || groupKeys.length) {
    for (const o of outs) {
      if (o.aggregate) continue;
      if (!groupKeys.length) throw new SqlError("ORA-00937", "not a single-group group function", "Add a GROUP BY for the non-COUNT columns.");
      if (!groupKeys.includes(o.key!)) {
        throw new SqlError("ORA-00979", "not a GROUP BY expression", `${o.name} must be in the GROUP BY list.`);
      }
    }
    const groups = new Map<string, Row[]>();
    for (const r of rows) {
      const k = JSON.stringify(groupKeys.map((g) => r.get(g)));
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k)!.push(r);
    }
    if (!groupKeys.length && groups.size === 0) groups.set("[]", []);
    produced = [...groups.values()].map((g) => ({ out: outs.map((o) => o.get(g[0] ?? new Map(), g)), src: g[0] ?? new Map() }));
  } else {
    produced = rows.map((r) => ({ out: outs.map((o) => o.get(r, [r])), src: r }));
  }

  if (q.distinct) {
    const seen = new Set<string>();
    produced = produced.filter((p) => {
      const k = JSON.stringify(p.out);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }

  if (q.orderBy.length) {
    const getters = q.orderBy.map(({ key, desc }) => {
      let get: (p: { out: Value[]; src: Row }) => Value;
      if (typeof key === "number") {
        if (key < 1 || key > outs.length) throw new SqlError("ORA-01785", "ORDER BY item must be the number of a SELECT-list expression");
        get = (p) => p.out[key - 1];
      } else {
        const byAlias = !key.table ? outs.findIndex((o) => o.name === key.column.toUpperCase()) : -1;
        if (byAlias >= 0) get = (p) => p.out[byAlias];
        else {
          const k = resolve(key);
          get = (p) => p.src.get(k) ?? null;
        }
      }
      return { get, desc };
    });
    produced.sort((a, b) => {
      for (const { get, desc } of getters) {
        const va = get(a);
        const vb = get(b);
        if (va === vb) continue;
        if (va === null) return desc ? -1 : 1; // Oracle: NULLs last ascending
        if (vb === null) return desc ? 1 : -1;
        const d = compare(va, vb);
        if (d !== 0) return desc ? -d : d;
      }
      return 0;
    });
  }

  if (q.limit !== undefined) produced = produced.slice(0, q.limit);
  return { columns: outs.map((o) => o.name), rows: produced.map((p) => p.out) };
}

/* ------------------------------------------------------------------ */
/* Public entry point                                                  */
/* ------------------------------------------------------------------ */

const show = (v: Value) => (v === null ? "(null)" : String(v));

function keyLabel(c: Column) {
  if (c.pk) return "PK";
  if (c.fk) return `FK > ${c.fk.table}.${c.fk.column}`;
  return "";
}

function helpResult(): QueryResult {
  return {
    kind: "rows",
    columns: ["TABLE_NAME", "COLUMNS"],
    rows: BASE_TABLES.map((t) => [
      t.name.toUpperCase(),
      t.columns.map((c) => (c.pk ? `${c.name} (PK)` : c.fk ? `${c.name} (FK)` : c.name)).join(", "),
    ]),
    comment: `-- Joins work. Try: ${JOIN_EXAMPLE}`,
  };
}

export function runQuery(input: string): QueryResult {
  const sql = input.trim().replace(/;+\s*$/, "");
  if (!sql) return { kind: "error", code: "SP2-0042", message: "unknown command", hint: "Type HELP to get started." };

  if (/^(drop|delete|truncate|update|alter|grant|revoke|insert|create|merge|shutdown|startup)\b/i.test(sql)) {
    return {
      kind: "error",
      code: "ORA-01031",
      message: "insufficient privileges",
      hint: "Nice try. This is production. Read-only for guests.",
    };
  }

  if (/^(help|show tables|\?)$/i.test(sql)) return helpResult();

  const desc = sql.match(/^desc(?:ribe)?\s+([a-z_$][a-z0-9_$]*)$/i);
  if (desc) {
    const t = findTable(desc[1]);
    if (!t) return { kind: "error", code: "ORA-04043", message: `object ${desc[1].toUpperCase()} does not exist`, hint: `Tables you can query: ${visibleTables()}` };
    const fkCol = t.columns.find((c) => c.fk);
    return {
      kind: "rows",
      columns: ["NAME", "NULL?", "TYPE", "KEY"],
      rows: t.columns.map((c) => [c.name.toUpperCase(), c.notNull ? "NOT NULL" : "", c.type, keyLabel(c)]),
      comment: fkCol
        ? `-- ${t.about}. Join on ${fkCol.name} to ${fkCol.fk!.table}.${fkCol.fk!.column}`
        : `-- ${t.about}.`,
    };
  }

  try {
    const query = new Parser(tokenize(sql)).parseSelect();
    const { columns, rows } = execute(query);
    return { kind: "rows", columns, rows: rows.map((r) => r.map(show)) };
  } catch (e) {
    if (e instanceof SqlError) return { kind: "error", code: e.code, message: e.message, hint: e.hint };
    return { kind: "error", code: "ORA-00600", message: "internal error code", hint: "You found a bug in my SQL engine. Impressive." };
  }
}
