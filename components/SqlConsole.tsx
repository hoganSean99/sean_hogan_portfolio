"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { highlight } from "./Sql";

type Result =
  | { kind: "record"; rows: [string, string][]; footer: string; comment?: string }
  | { kind: "table"; columns: string[]; rows: string[][]; footer: string; comment?: string }
  | { kind: "error"; code: string; message: string; hint?: string };

type Preset = { id: string; label: string; query: string; result: Result };

const PRESETS: Preset[] = [
  {
    id: "people",
    label: "Who is Seán?",
    query: "SELECT * FROM people WHERE name = 'Seán Hogan';",
    result: {
      kind: "record",
      rows: [
        ["NAME", "Seán Hogan"],
        ["ROLE", "Oracle Database Administrator"],
        ["EMPLOYER", "JRI America, Tralee"],
        ["LOCATION", "Co. Kerry, Ireland"],
        ["UPTIME", "6 years in production"],
        ["APPS", "2 live, 1 in development"],
      ],
      footer: "1 row selected.",
      comment: "-- 0 rows deleted. Production is safe.",
    },
  },
  {
    id: "apps",
    label: "Apps",
    query: "SELECT name, status FROM apps ORDER BY shipped DESC;",
    result: {
      kind: "table",
      columns: ["NAME", "STATUS"],
      rows: [
        ["Quotely", "LIVE (App Store)"],
        ["Lost Paws", "LIVE (App Store)"],
        ["PawRota", "BUILDING"],
      ],
      footer: "3 rows selected.",
      comment: "-- Scroll down for the full story.",
    },
  },
  {
    id: "stack",
    label: "Tech stack",
    query: "SELECT area, tools FROM stack;",
    result: {
      kind: "table",
      columns: ["AREA", "TOOLS"],
      rows: [
        ["DATABASES", "Oracle 11g to 19c, SQL, PostgreSQL"],
        ["AUTOMATION", "Python, Bash, Ansible, Linux"],
        ["APPS", "React Native, Expo, Swift, Next.js"],
        ["AI", "Claude Code, OpenAI API, N8N"],
      ],
      footer: "4 rows selected.",
    },
  },
  {
    id: "coffee",
    label: "Coffee",
    query: "SELECT brew_method FROM coffee WHERE drinker = 'sean';",
    result: {
      kind: "record",
      rows: [["BREW_METHOD", "French press"]],
      footer: "1 row selected.",
      comment: "-- Constraint COFFEE_NOT_NULL is enabled.",
    },
  },
];

const HELP: Result = {
  kind: "table",
  columns: ["TABLE_NAME", "WHAT'S IN IT"],
  rows: [
    ["PEOPLE", "Who I am"],
    ["APPS", "What I've shipped"],
    ["STACK", "What I work with"],
    ["COFFEE", "Essential infrastructure"],
  ],
  footer: "4 rows selected.",
  comment: "-- Try: SELECT * FROM apps;",
};

function resolve(input: string): { query: string; result: Result } {
  const query = input.trim().replace(/;?$/, ";");
  const q = query.toLowerCase();
  if (/\b(drop|delete|truncate|update|alter|grant|insert)\b/.test(q)) {
    return {
      query,
      result: {
        kind: "error",
        code: "ORA-01031",
        message: "insufficient privileges",
        hint: "Nice try. This is production.",
      },
    };
  }
  if (/\b(help|tables|all_tables|user_tables|tab)\b/.test(q)) return { query, result: HELP };
  const byTable: [RegExp, string][] = [
    [/\bapps?\b/, "apps"],
    [/\b(stack|skills?|tools)\b/, "stack"],
    [/\bcoffee\b/, "coffee"],
    [/\b(people|sean|whoami|me)\b|seán/, "people"],
  ];
  for (const [pattern, id] of byTable) {
    if (pattern.test(q)) {
      const preset = PRESETS.find((p) => p.id === id)!;
      return { query, result: preset.result };
    }
  }
  return {
    query,
    result: {
      kind: "error",
      code: "ORA-00942",
      message: "table or view does not exist",
      hint: "Type HELP to see the tables you can query.",
    },
  };
}

type Phase = "typing" | "running" | "done";

export default function SqlConsole() {
  const [query, setQuery] = useState(PRESETS[0].query);
  const [result, setResult] = useState<Result>(PRESETS[0].result);
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [active, setActive] = useState<string | null>(PRESETS[0].id);
  const [draft, setDraft] = useState("");
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const play = useCallback((nextQuery: string, nextResult: Result, animate: boolean) => {
    clear();
    setQuery(nextQuery);
    setResult(nextResult);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate || reduce) {
      setTyped(nextQuery.length);
      setPhase("done");
      return;
    }
    setTyped(0);
    setPhase("typing");
    const step = 26;
    for (let i = 1; i <= nextQuery.length; i++) {
      timers.current.push(window.setTimeout(() => setTyped(i), 250 + i * step));
    }
    const end = 250 + nextQuery.length * step;
    timers.current.push(window.setTimeout(() => setPhase("running"), end + 120));
    timers.current.push(window.setTimeout(() => setPhase("done"), end + 520));
  }, []);

  useEffect(() => {
    play(PRESETS[0].query, PRESETS[0].result, true);
    return clear;
  }, [play]);

  const runPreset = (preset: Preset) => {
    setActive(preset.id);
    play(preset.query, preset.result, true);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const { query: q, result: r } = resolve(draft.slice(0, 160));
    setActive(null);
    setDraft("");
    play(q, r, false);
  };

  const showCursor = phase !== "done";

  return (
    <figure className="console" aria-label="An interactive SQL console about Seán Hogan">
      <div className="console-bar">
        <span className="console-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="console-title">sqlplus guest@seanhogan</span>
        <button type="button" className="console-rerun" onClick={() => play(query, result, true)}>
          Run again
        </button>
      </div>

      <div className="console-body">
        <p className="console-line">
          <span className="query-prompt" aria-hidden="true">
            SQL&gt;
          </span>{" "}
          <code>
            <span className="sr-only">{query}</span>
            <span aria-hidden="true">
              {highlight(query.slice(0, typed))}
              {showCursor && <span className="cursor" />}
            </span>
          </code>
        </p>

        {phase === "running" && <p className="console-muted">Executing…</p>}

        <div className={`console-result ${phase === "done" ? "is-visible" : ""}`} aria-live="polite">
          {phase === "done" && <ResultView result={result} />}
        </div>

        <form className="console-input" onSubmit={onSubmit}>
          <label htmlFor="sql-input" className="query-prompt">
            SQL&gt;
          </label>
          <input
            id="sql-input"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a query, or HELP"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            maxLength={160}
          />
          <button type="submit">Run</button>
        </form>
      </div>

      <div className="console-presets" role="group" aria-label="Example queries">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={active === preset.id ? "is-active" : undefined}
            aria-pressed={active === preset.id}
            onClick={() => runPreset(preset)}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </figure>
  );
}

function ResultView({ result }: { result: Result }) {
  if (result.kind === "error") {
    return (
      <div className="console-error">
        <p>
          <span className="console-error-code">{result.code}:</span> {result.message}
        </p>
        {result.hint && <p className="console-comment">-- {result.hint}</p>}
      </div>
    );
  }
  return (
    <>
      {result.kind === "record" ? (
        <dl className="record">
          {result.rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <table className="result-table">
          <thead>
            <tr>
              {result.columns.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="console-muted">{result.footer}</p>
      {result.comment && <p className="console-comment">{result.comment}</p>}
    </>
  );
}
