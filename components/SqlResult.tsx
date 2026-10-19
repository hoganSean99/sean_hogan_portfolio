import type { QueryResult } from "@/lib/sql-engine";

export function footer(n: number) {
  if (n === 0) return "no rows selected";
  return n === 1 ? "1 row selected." : `${n} rows selected.`;
}

export function ResultView({ result }: { result: QueryResult }) {
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

  const { columns, rows } = result;
  const asRecord = rows.length === 1 && columns.length > 2;

  return (
    <>
      {rows.length > 0 &&
        (asRecord ? (
          <dl className="record">
            {columns.map((c, i) => (
              <div key={c}>
                <dt>{c}</dt>
                <dd>{rows[0][i]}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className="result-scroll">
            <table className="result-table">
              <thead>
                <tr>
                  {columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, i) => (
                      <td key={i}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      <p className="console-muted">{footer(rows.length)}</p>
      {result.comment && <p className="console-comment">{result.comment}</p>}
    </>
  );
}
