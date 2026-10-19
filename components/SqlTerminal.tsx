"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { JOIN_EXAMPLE, QueryResult, runQuery, TABLES } from "@/lib/sql-engine";
import { highlight } from "./Sql";
import { ResultView } from "./SqlResult";

const OPEN_EVENT = "open-sql-terminal";
const MOBILE_QUERY = "(max-width: 759px)";

export function openTerminal() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Entry = { id: number; query: string; result?: QueryResult; note?: string };

const BANNER = [
  "Connected to seanhogan.me as GUEST (read-only).",
  `Tables: ${TABLES.filter((t) => !t.hidden).map((t) => t.name).join(", ")}`,
  "Tables are linked with primary and foreign keys. SELECT * FROM user_constraints shows them all.",
  `Try a join: ${JOIN_EXAMPLE}`,
  "HELP lists columns, DESCRIBE <table> shows keys, CLEAR wipes the screen, EXIT closes.",
];

export default function SqlTerminal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [draft, setDraft] = useState("");
  const history = useRef<string[]>([]);
  const historyPos = useRef(-1);
  const nextId = useRef(1);
  const [fabHidden, setFabHidden] = useState(true);

  // Only show the floating button once the hero console has scrolled out of view.
  useEffect(() => {
    const heroConsole = document.querySelector(".hero .console");
    if (!heroConsole) {
      setFabHidden(false);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setFabHidden(entry.isIntersecting), { threshold: 0.15 });
    io.observe(heroConsole);
    return () => io.disconnect();
  }, []);

  const open = () => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    if (window.matchMedia(MOBILE_QUERY).matches) return; // the terminal is desktop-only
    d.showModal();
    // Focus synchronously, inside the tap that opened the terminal:
    // iOS only shows the keyboard for focus that happens during a user gesture.
    inputRef.current?.focus({ preventScroll: true });
  };

  // Keep the terminal inside the visible area when the on-screen keyboard opens.
  // iOS overlays the keyboard on the page without resizing it, which would hide the input.
  useEffect(() => {
    const d = dialogRef.current;
    const vv = window.visualViewport;
    if (!d || !vv) return;
    const fit = () => {
      d.style.setProperty("--vv-height", `${vv.height}px`);
      d.style.setProperty("--vv-top", `${vv.offsetTop}px`);
      logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
    };
    fit();
    vv.addEventListener("resize", fit);
    vv.addEventListener("scroll", fit);
    return () => {
      vv.removeEventListener("resize", fit);
      vv.removeEventListener("scroll", fit);
    };
  }, []);
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const onOpen = () => open();
    const onKey = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.closest("input, textarea, [contenteditable='true']");
      if (e.key === "`" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [entries]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const raw = draft.trim().slice(0, 200);
    if (!raw) return;
    const cmd = raw.replace(/;+\s*$/, "").toLowerCase();
    history.current = [raw, ...history.current.filter((h) => h !== raw)].slice(0, 30);
    historyPos.current = -1;
    setDraft("");

    if (cmd === "clear" || cmd === "cls") {
      setEntries([]);
      return;
    }
    if (cmd === "exit" || cmd === "quit") {
      setEntries((prev) => [...prev, { id: nextId.current++, query: raw, note: "Disconnected. See you soon." }]);
      window.setTimeout(close, 450);
      return;
    }
    const query = /;\s*$/.test(raw) ? raw : `${raw};`;
    setEntries((prev) => [...prev, { id: nextId.current++, query, result: runQuery(query) }].slice(-40));
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

  return (
    <>
      <button
        type="button"
        className={`terminal-fab${fabHidden ? " is-hidden" : ""}`}
        onClick={open}
        aria-label="Open the SQL terminal"
        tabIndex={fabHidden ? -1 : 0}
      >
        <span className="terminal-fab-prompt">SQL&gt;</span>
        <span className="terminal-fab-label">Terminal</span>
        <kbd aria-hidden="true">`</kbd>
      </button>

      <dialog
        ref={dialogRef}
        className="terminal"
        aria-label="SQL terminal"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="terminal-inner">
          <div className="console-bar">
            <span className="console-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="console-title">sqlplus guest@seanhogan</span>
            <button type="button" className="console-rerun" onClick={close}>
              Close
            </button>
          </div>

          <div className="terminal-log" ref={logRef} onClick={() => inputRef.current?.focus()}>
            {BANNER.map((line) => (
              <p key={line} className="console-comment">
                -- {line}
              </p>
            ))}
            {entries.map((entry) => (
              <div key={entry.id} className="terminal-entry">
                <p className="console-line">
                  <span className="query-prompt" aria-hidden="true">
                    SQL&gt;
                  </span>{" "}
                  <code>{highlight(entry.query)}</code>
                </p>
                <div aria-live="polite">
                  {entry.result && <ResultView result={entry.result} />}
                  {entry.note && <p className="console-muted">{entry.note}</p>}
                </div>
              </div>
            ))}
          </div>

          <form className="console-input terminal-input" onSubmit={submit}>
            <label htmlFor="terminal-input" className="query-prompt">
              SQL&gt;
            </label>
            <input
              ref={inputRef}
              id="terminal-input"
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type SQL, or HELP"
              enterKeyHint="go"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              maxLength={200}
            />
            <button type="submit">Run</button>
          </form>
        </div>
      </dialog>
    </>
  );
}
