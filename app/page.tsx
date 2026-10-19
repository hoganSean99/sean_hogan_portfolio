import Image from "next/image";
import {
  apps,
  education,
  facts,
  otherBuilds,
  outside,
  profile,
  skills,
  work,
} from "@/lib/content";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="section-title">
        {title}
      </h2>
      <div className="section-body">{children}</div>
    </section>
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
        <div className="wrap">
          <section id="top" className="hero" aria-label="Introduction">
            <div className="hero-text">
              <p className="hero-role">
                {profile.role}, {profile.location}
              </p>
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
            <div className="hero-photo">
              <Image
                src="/sean.webp"
                alt="Seán Hogan"
                width={433}
                height={433}
                priority
                sizes="(max-width: 760px) 160px, 300px"
              />
            </div>
            <dl className="facts">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <Section id="work" title="Work">
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

          <Section id="apps" title="Apps">
            <p className="section-lede">
              Products I&apos;ve designed, built and shipped on my own, from first sketch to App Store review.
            </p>
            <ul className="apps">
              {apps.map((app) => (
                <li key={app.name} className="app">
                  <div className="app-head">
                    <h3 className="app-name">
                      {app.href ? (
                        <a href={app.href} target="_blank" rel="noopener noreferrer">
                          {app.name}
                        </a>
                      ) : (
                        app.name
                      )}
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

            <h3 className="subhead">Other builds</h3>
            <ul className="builds">
              {otherBuilds.map((build) => (
                <li key={build.name} className="build">
                  <h4>
                    {build.href ? (
                      <a href={build.href} target="_blank" rel="noopener noreferrer">
                        {build.name}
                      </a>
                    ) : (
                      build.name
                    )}
                  </h4>
                  <p>{build.description}</p>
                  <Stack items={build.stack} />
                </li>
              ))}
            </ul>
          </Section>

          <Section id="skills" title="Skills">
            <div className="skills">
              {skills.map((group) => (
                <div key={group.group} className="skill-group">
                  <h3>{group.group}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section id="outside" title="Outside work">
            <p className="outside">{outside}</p>
          </Section>

          <Section id="contact" title="Contact">
            <p className="contact-lead">
              Email is the quickest way to reach me.
            </p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <ul className="contact-links">
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>{profile.location}</li>
            </ul>
          </Section>
        </div>
      </main>

      <footer className="footer">
        <div className="wrap">© {new Date().getFullYear()} Seán Hogan</div>
      </footer>
    </>
  );
}
