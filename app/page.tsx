import Image from "next/image";
import { Query } from "@/components/Sql";
import SqlConsole from "@/components/SqlConsole";
import SqlTerminal from "@/components/SqlTerminal";
import { apps, education, life, otherBuilds, profile, skills, work } from "@/lib/content";

function Section({
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

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="stack" aria-label="Built with">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>

      <header className="masthead">
        <div className="wrap masthead-inner">
          <a href="#top" className="brand">
            Seán Hogan
          </a>
          <nav aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#apps">Apps</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="top" className="wrap hero" aria-label="Introduction">
          <div className="hero-text">
            <div className="hero-id">
              <Image
                src="/sean.webp"
                alt="Seán Hogan"
                width={433}
                height={433}
                priority
                sizes="96px"
                className="hero-photo"
              />
              <p className="hero-role">
                {profile.role}
                <br />
                {profile.location}
              </p>
            </div>
            <h1 className="hero-name">
              <span>Seán</span>
              <span>Hogan</span>
            </h1>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href={`mailto:${profile.email}`}>
                Email me
              </a>
              <a className="button" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a className="button" href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
          <SqlConsole />
        </section>

        <Section
          id="work"
          title="Work"
          query="SELECT role, company, years FROM career ORDER BY start_date DESC;"
        >
          {work.map((job) => (
            <article key={job.org} className="job">
              <header className="job-head">
                <h3>{job.role}</h3>
                <p className="job-meta">
                  {job.org}, {job.place}
                  <span className="job-period">{job.period}</span>
                </p>
              </header>
              <p className="job-summary">{job.summary}</p>
              <ul className="job-points">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
          <article className="job job-education">
            <header className="job-head">
              <h3>{education.degree}</h3>
              <p className="job-meta">
                {education.org}
                <span className="job-period">{education.period}</span>
              </p>
            </header>
          </article>
        </Section>

        <Section
          id="apps"
          title="Apps"
          tone="band"
          query="SELECT * FROM apps WHERE built_by = 'sean' ORDER BY shipped DESC;"
        >
          <p className="section-lede">
            Products I&apos;ve designed, built and shipped on my own, from first sketch to App Store review.
          </p>
          <ul className="apps">
            {apps.map((app) => (
              <li key={app.name} className="app">
                <div className="app-head">
                  <h3 className="app-name">
                    {app.href ? <ExternalLink href={app.href}>{app.name}</ExternalLink> : app.name}
                  </h3>
                  <span className={`status status-${app.status}`}>
                    {app.status === "live" ? "Live on the App Store" : "In development"}
                  </span>
                </div>
                <p className="app-desc">{app.description}</p>
                <Stack items={app.stack} />
              </li>
            ))}
          </ul>
          <p className="result-count">{apps.length} rows selected.</p>

          <h3 className="subhead">Other builds</h3>
          <ul className="builds">
            {otherBuilds.map((build) => (
              <li key={build.name} className="build">
                <h4>{build.href ? <ExternalLink href={build.href}>{build.name}</ExternalLink> : build.name}</h4>
                <p>{build.description}</p>
                <Stack items={build.stack} />
              </li>
            ))}
          </ul>
        </Section>

        <Section id="skills" title="Skills" query="DESCRIBE sean_hogan;">
          <table className="sql-table describe">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Null?</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((row) => (
                <tr key={row.name}>
                  <th scope="row">{row.name}</th>
                  <td className="describe-null">{row.notNull ? "NOT NULL" : ""}</td>
                  <td>{row.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section id="outside" title="Outside work" query="SELECT * FROM life WHERE keyboard = 'OFF';">
          <table className="sql-table life">
            <thead>
              <tr>
                <th scope="col">Activity</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              {life.map((row) => (
                <tr key={row.activity}>
                  <th scope="row">{row.activity}</th>
                  <td>{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="result-count">{life.length} rows selected.</p>
        </Section>

        <Section
          id="contact"
          title="Contact"
          query="INSERT INTO inbox (sender, message) VALUES ('you', 'Hi Seán');"
        >
          <p className="contact-lead">Email is the quickest way to reach me.</p>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <ul className="contact-links">
            <li>
              <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.github}>GitHub</ExternalLink>
            </li>
            <li>{profile.location}</li>
          </ul>
        </Section>
      </main>

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

      <SqlTerminal />
    </>
  );
}
