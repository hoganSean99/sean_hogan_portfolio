import Image from "next/image";
import Link from "next/link";
import { AppStoreButton, ExternalLink, Footer, Masthead, Section, Stack } from "@/components/Layout";
import SqlConsole from "@/components/SqlConsole";
import SqlTerminal from "@/components/SqlTerminal";
import { apps, education, life, otherBuilds, profile, skills, work } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Masthead />

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
                  <div className="app-title">
                    {app.icon ? (
                      <Image src={app.icon} alt="" width={64} height={64} className="app-icon" />
                    ) : (
                      <span className="app-icon app-icon-placeholder" aria-hidden="true">
                        {app.name.slice(0, 1)}
                      </span>
                    )}
                    <div>
                      <h3 className="app-name">
                        {app.slug ? <Link href={`/apps/${app.slug}`}>{app.name}</Link> : app.name}
                      </h3>
                      <p className="app-tagline">{app.tagline}</p>
                    </div>
                  </div>
                  <span className={`status status-${app.status}`}>
                    {app.status === "live" ? "Live on the App Store" : "In development"}
                  </span>
                </div>
                <p className="app-desc">{app.description}</p>
                {app.shots && (
                  <ul className="shots" aria-label={`${app.name} screenshots`}>
                    {app.shots.map((shot) => (
                      <li key={shot.src} className={`shot shot-${shot.kind}`}>
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          width={shot.width}
                          height={shot.height}
                          sizes="(max-width: 760px) 45vw, 200px"
                        />
                      </li>
                    ))}
                  </ul>
                )}
                <Stack items={app.stack} />
                {(app.slug || app.appStore) && (
                  <div className="app-actions">
                    {app.slug && (
                      <Link className="button button-light" href={`/apps/${app.slug}`}>
                        Read the case study
                      </Link>
                    )}
                    {app.appStore && <AppStoreButton href={app.appStore} className="button button-ghost" />}
                  </div>
                )}
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

      <Footer />

      <SqlTerminal />
    </>
  );
}
