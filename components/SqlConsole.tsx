"use client";

import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { JOIN_EXAMPLE, QueryResult, runQuery, TABLES } from "@/lib/sql-engine";
import { highlight } from "./Sql";
import { ResultView } from "./SqlResult";
import { openTerminal } from "./SqlTerminal";

const INTRO_QUERY = "SELECT * FROM people WHERE name = 'Seán Hogan';";
const INTRO_COMMENT = "-- 0 rows deleted. Production is safe.";

type Phase = "typing" | "running" | "done";

export default function SqlConsole() {
  const [query, setQuery] = useState(INTRO_QUERY);
  const [result, setResult] = useState<QueryResult>(() => runQuery(INTRO_QUERY));
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [active, setActive] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const history = useRef<string[]>([]);
  const historyPos = useRef(-1);
  const timers = useRef<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const play = useCallback((sql: string, animate: boolean) => {
    clear();
    const res = runQuery(sql);
    if (sql === INTRO_QUERY && res.kind === "rows") res.comment = INTRO_COMMENT;
    setQuery(sql);
    setResult(res);
    bodyRef.current?.scrollTo({ top: 0 });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate || reduce) {
      setTyped(sql.length);
      setPhase("done");
      return;
    }
    setTyped(0);
    setPhase("typing");
    const step = 24;
    for (let i = 1; i <= sql.length; i++) {
      timers.current.push(window.setTimeout(() => setTyped(i), 200 + i * step));
    }
    const end = 200 + sql.length * step;
    timers.current.push(window.setTimeout(() => setPhase("running"), end + 100));
    timers.current.push(window.setTimeout(() => setPhase("done"), end + 450));
  }, []);

  useEffect(() => {
    play(INTRO_QUERY, true);
    return clear;
  }, [play]);

  const runTable = (name: string) => {
    setActive(name);
    play(`SELECT * FROM ${name};`, true);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const sql = draft.trim().slice(0, 200);
    if (!sql) return;
    const withSemi = /;\s*$/.test(sql) ? sql : `${sql};`;
    history.current = [withSemi, ...history.current.filter((h) => h !== withSemi)].slice(0, 20);
    historyPos.current = -1;
    setActive(null);
    setDraft("");
    play(withSemi, false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const h = history.current;
    if (!h.length) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      historyPos.current = Math.min(historyPos.current + 1, h.length - 1);
      setDraft(h[historyPos.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      historyPos.current = Math.max(historyPos.current - 1, -1);
      setDraft(historyPos.current === -1 ? "" : h[historyPos.current]);
    }
  };

  const showCursor = phase !== "done";

  return (
    <figure className="console" aria-label="An interactive, read-only SQL console about Seán Hogan">
      <div className="console-bar">
        <span className="console-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="console-title">sqlplus guest@seanhogan</span>
        <button type="button" className="console-rerun" onClick={() => play(query, true)}>
          Run again
        </button>
        <button type="button" className="console-rerun" onClick={openTerminal}>
          Expand
        </button>
      </div>

      <div className="console-body" ref={bodyRef}>
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
      </div>

      <form className="console-input" onSubmit={onSubmit}>
        <label htmlFor="sql-input" className="query-prompt">
          SQL&gt;
        </label>
        <input
          ref={inputRef}
          id="sql-input"
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="SELECT name, status FROM apps;"
          enterKeyHint="go"
          aria-describedby="sql-help"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          maxLength={200}
        />
        <button type="submit">Run</button>
      </form>

      <div className="console-tables">
        <p id="sql-help" className="console-help">
          Write your own query, or click a table. Joins work: tables are linked by keys, so try{" "}
          <code>DESCRIBE app_stack</code> or <code>HELP</code> to see how.
        </p>
        <div className="console-chips" role="group" aria-label="Tables you can query">
          <button
            type="button"
            className={`chip-join${active === "join" ? " is-active" : ""}`}
            aria-pressed={active === "join"}
            onClick={() => {
              setActive("join");
              play(JOIN_EXAMPLE, true);
            }}
          >
            Try a join
          </button>
          {TABLES.filter((t) => !t.hidden).map((t) => (
            <button
              key={t.name}
              type="button"
              className={active === t.name ? "is-active" : undefined}
              aria-pressed={active === t.name}
              title={`${t.about}: ${t.columns.map((c) => c.name).join(", ")}`}
              onClick={() => runTable(t.name)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
    </figure>
  );
}
