// Tiny SQL syntax highlighter. Enough for the handful of queries on the site.

const KEYWORDS = new Set([
  "SELECT", "FROM", "WHERE", "AND", "OR", "ORDER", "BY", "DESC", "ASC",
  "INSERT", "INTO", "VALUES", "DESCRIBE", "COMMIT", "NOT", "NULL", "LIMIT",
]);

const TOKEN = /(--.*$)|('(?:[^']|'')*'?)|(\b\d+\b)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|([^\sA-Za-z0-9_']+)/gm;

export function highlight(source: string) {
  const parts: React.ReactNode[] = [];
  let match: RegExpExecArray | null;
  let i = 0;
  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(source)) !== null) {
    const [text, comment, str, num, word] = match;
    let cls: string | undefined;
    if (comment) cls = "tok-comment";
    else if (str) cls = "tok-string";
    else if (num) cls = "tok-number";
    else if (word && KEYWORDS.has(word)) cls = "tok-keyword";
    parts.push(
      cls ? (
        <span key={i++} className={cls}>
          {text}
        </span>
      ) : (
        text
      )
    );
  }
  return parts;
}

export function Query({ children }: { children: string }) {
  return (
    <p className="query">
      <span className="query-prompt" aria-hidden="true">
        SQL&gt;
      </span>{" "}
      <code>{highlight(children)}</code>
    </p>
  );
}
