import { describe, expect, it } from "vitest";
import { runQuery } from "./sql-engine";

const rows = (sql: string) => {
  const r = runQuery(sql);
  if (r.kind !== "rows") throw new Error(`${r.code}: ${r.message}`);
  return r;
};
const error = (sql: string) => {
  const r = runQuery(sql);
  if (r.kind !== "error") throw new Error(`expected an error for: ${sql}`);
  return r.code;
};

describe("basic SELECT", () => {
  it("returns every column for SELECT *", () => {
    const r = rows("SELECT * FROM people;");
    expect(r.columns).toEqual(["PERSON_ID", "NAME", "ROLE", "EMPLOYER", "LOCATION", "UPTIME"]);
    expect(r.rows).toHaveLength(1);
  });

  it("filters, orders and limits", () => {
    const r = rows("SELECT skill FROM skills WHERE area = 'AI' ORDER BY skill DESC FETCH FIRST 2 ROWS ONLY");
    expect(r.rows).toEqual([["OpenAI API"], ["N8N workflows"]]);
  });

  it("supports LIKE, OR and DISTINCT", () => {
    expect(rows("SELECT skill FROM skills WHERE skill LIKE '%sql%' ORDER BY 1").rows).toEqual([["PostgreSQL"], ["SQL"]]);
    expect(rows("SELECT DISTINCT area FROM skills WHERE area = 'AI' OR area = 'APPS' ORDER BY area").rows).toEqual([["AI"], ["APPS"]]);
  });

  it("handles escaped quotes in strings", () => {
    expect(rows("SELECT name FROM apps WHERE name = 'it''s'").rows).toEqual([]);
  });
});

describe("joins", () => {
  it("inner joins on a foreign key", () => {
    const r = rows("SELECT a.name, s.tech FROM apps a JOIN app_stack s ON a.app_id = s.app_id WHERE s.tech = 'Supabase'");
    expect(r.rows.map((x) => x[0])).toEqual(["Quotely", "Lost Paws", "PawRota"]);
  });

  it("keeps unmatched rows with LEFT JOIN and fills them with null", () => {
    const r = rows("SELECT a.name, l.store FROM apps a LEFT JOIN store_listings l ON a.app_id = l.app_id WHERE l.listing_id IS NULL");
    expect(r.rows).toEqual([["PawRota", "(null)"]]);
  });

  it("groups and counts across a join", () => {
    const r = rows(
      "SELECT a.name, COUNT(*) AS techs FROM apps a JOIN app_stack s ON a.app_id = s.app_id GROUP BY a.name ORDER BY techs DESC"
    );
    expect(r.columns).toEqual(["NAME", "TECHS"]);
    expect(Number(r.rows[0][1])).toBeGreaterThanOrEqual(Number(r.rows[1][1]));
  });

  it("chains three tables", () => {
    const r = rows(
      "SELECT p.name, a.name, s.tech FROM people p JOIN apps a ON p.person_id = a.person_id JOIN app_stack s ON a.app_id = s.app_id WHERE a.name = 'Quotely'"
    );
    expect(r.rows.every((x) => x[0] === "Seán Hogan" && x[1] === "Quotely")).toBe(true);
  });
});

describe("keys and metadata", () => {
  it("lists foreign keys in user_constraints", () => {
    const r = rows("SELECT column_name, references FROM user_constraints WHERE table_name = 'APP_STACK'");
    expect(r.rows).toEqual([["APP_ID", "APPS.APP_ID"]]);
  });

  it("shows keys in DESCRIBE", () => {
    const r = rows("DESCRIBE store_listings");
    expect(r.rows.find((x) => x[0] === "APP_ID")?.[3]).toBe("FK > apps.app_id");
  });
});

describe("errors behave like Oracle", () => {
  it.each([
    ["SELECT * FROM bananas", "ORA-00942"],
    ["SELECT nope FROM apps", "ORA-00904"],
    ["SELECT name FROM people p JOIN apps a ON p.person_id = a.person_id", "ORA-00918"],
    ["SELECT area, COUNT(*) FROM skills", "ORA-00937"],
    ["SELECT skill, COUNT(*) FROM skills GROUP BY area", "ORA-00979"],
    ["SELECT * FROM apps WHERE name = 'oops", "ORA-01756"],
    ["SELECT name FROM apps LIMIT 1 extra", "ORA-00933"],
    ["SELECT * FROM apps a JOIN app_stack s", "ORA-00905"],
    ["DROP TABLE people", "ORA-01031"],
    ["DELETE FROM apps", "ORA-01031"],
  ])("%s -> %s", (sql, code) => {
    expect(error(sql)).toBe(code);
  });
});
