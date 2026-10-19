import Link from "next/link";
import { Query } from "./Sql";

export function Section({
  id,
  title,
  query,
  tone = "plain",
  children,
}: {
  id: string;
  title: string;
  query: string;
  tone?: "plain" | "band";
  children: React.ReactNode;
}) {
  return (
    <div className={tone === "band" ? "band" : undefined}>
      <section id={id} className="wrap section" aria-labelledby={`${id}-title`}>
        <div className="section-head">
          <h2 id={`${id}-title`} className="section-title">
            {title}
          </h2>
          <Query>{query}</Query>
        </div>
        <div className="section-body">{children}</div>
      </section>
    </div>
  );
}

export function Stack({ items }: { items: string[] }) {
  return (
    <ul className="stack" aria-label="Built with">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function Masthead({ home = true }: { home?: boolean }) {
  const prefix = home ? "" : "/";
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header className="masthead">
        <div className="wrap masthead-inner">
          <Link href={home ? "#top" : "/"} className="brand">
            Seán Hogan
          </Link>
          <nav aria-label="Sections">
            <a href={`${prefix}#work`}>Work</a>
            <a href={`${prefix}#apps`}>Apps</a>
            <a href={`${prefix}#skills`}>Skills</a>
            <a href={`${prefix}#contact`}>Contact</a>
          </nav>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="wrap footer">
      <p className="footer-commit">
        <span className="query-prompt" aria-hidden="true">
          SQL&gt;
        </span>{" "}
        <code>
          <span className="tok-keyword">COMMIT</span>;
        </code>
        <span className="footer-note">Commit complete.</span>
      </p>
      <p>© {new Date().getFullYear()} Seán Hogan</p>
    </footer>
  );
}

export function AppStoreButton({ href, className = "button" }: { href: string; className?: string }) {
  return (
    <ExternalLink href={href} className={`${className} button-store`}>
      View on the App Store
    </ExternalLink>
  );
}
