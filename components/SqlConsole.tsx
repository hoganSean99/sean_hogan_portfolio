"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { highlight } from "./Sql";

const QUERY = "SELECT * FROM people WHERE name = 'Seán Hogan';";

type Row = { column: string; value: string; blob?: boolean };

const ROWS: Row[] = [
  { column: "NAME", value: "Seán Hogan" },
  { column: "ROLE", value: "Oracle Database Administrator" },
  { column: "EMPLOYER", value: "JRI America, Tralee" },
  { column: "LOCATION", value: "Co. Kerry, Ireland" },
  { column: "UPTIME", value: "6 years in production" },
  { column: "APPS", value: "2 live, 1 in development" },
  { column: "PHOTO", value: "", blob: true },
];

type Phase = "typing" | "running" | "done";

export default function SqlConsole() {
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const run = useCallback(() => {
    clear();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(QUERY.length);
      setPhase("done");
      return;
    }
    setTyped(0);
    setPhase("typing");
    const step = 32;
    for (let i = 1; i <= QUERY.length; i++) {
      timers.current.push(window.setTimeout(() => setTyped(i), 350 + i * step));
    }
    const end = 350 + QUERY.length * step;
    timers.current.push(window.setTimeout(() => setPhase("running"), end + 150));
    timers.current.push(window.setTimeout(() => setPhase("done"), end + 650));
  }, []);

  useEffect(() => {
    run();
    return clear;
  }, [run]);

  const showCursor = phase !== "done";

  return (
    <figure className="console" aria-label="A SQL query that returns a summary of Seán Hogan">
      <div className="console-bar">
        <span className="console-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="console-title">sqlplus sean@prod</span>
        <button type="button" className="console-rerun" onClick={run}>
          Run again
        </button>
      </div>

      <div className="console-body">
        <p className="console-line">
          <span className="query-prompt" aria-hidden="true">
            SQL&gt;
          </span>{" "}
          <code>
            <span className="sr-only">{QUERY}</span>
            <span aria-hidden="true">
              {highlight(QUERY.slice(0, typed))}
              {showCursor && <span className="cursor" />}
            </span>
          </code>
        </p>

        {phase === "running" && <p className="console-muted">Executing…</p>}

        <div className={`console-result ${phase === "done" ? "is-visible" : ""}`}>
          <dl className="record">
            {ROWS.map((row) => (
              <div key={row.column}>
                <dt>{row.column}</dt>
                <dd>
                  {row.blob ? (
                    <Image
                      src="/sean.webp"
                      alt="Seán Hogan"
                      width={433}
                      height={433}
                      priority
                      sizes="96px"
                      className="record-photo"
                    />
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="console-muted">1 row selected.</p>
          <p className="console-comment">-- 0 rows deleted. Production is safe.</p>
        </div>
      </div>
    </figure>
  );
}
