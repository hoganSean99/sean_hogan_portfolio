import Link from "next/link";
import { Query } from "@/components/Sql";

export default function NotFound() {
  return (
    <main className="wrap notfound">
      <Query>SELECT * FROM pages WHERE url = :requested_url;</Query>
      <h1>
        <span className="notfound-code">ORA-01403</span>
        No data found
      </h1>
      <p>That page doesn&apos;t exist. Nothing was dropped, promise.</p>
      <Link className="button button-primary" href="/">
        Back to the homepage
      </Link>
    </main>
  );
}
