import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppStoreButton, ExternalLink, Footer, Masthead, Section, Stack } from "@/components/Layout";
import SqlTerminal from "@/components/SqlTerminal";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { apps } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

function load(slug: string) {
  const study = getCaseStudy(slug);
  const app = apps.find((a) => a.slug === slug);
  return study && app ? { study, app } : null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const data = load(slug);
  if (!data) return {};
  const title = `${data.app.name} | Seán Hogan`;
  return {
    title,
    description: data.study.summary,
    openGraph: { title, description: data.study.summary, images: data.app.icon ? [data.app.icon] : undefined },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const data = load(slug);
  if (!data) notFound();
  const { study, app } = data;
  const websiteLabel = app.website?.replace(/^https?:\/\/(www\.)?/, "");

  return (
    <>
      <Masthead home={false} />

      <main id="main">
        <section className="wrap case-hero" aria-labelledby="case-title">
          <Link href="/#apps" className="back-link">
            Back to all apps
          </Link>
          <div className="case-id">
            {app.icon && <Image src={app.icon} alt="" width={96} height={96} className="case-icon" priority />}
            <span className={`status status-${app.status} status-light`}>
              {app.status === "live" ? "Live on the App Store" : "In development"}
            </span>
          </div>
          <h1 id="case-title" className="case-name">
            {app.name}
          </h1>
          <p className="case-tagline">{app.tagline}</p>
          <p className="case-summary">{study.summary}</p>
          <div className="hero-actions">
            {app.appStore && <AppStoreButton href={app.appStore} className="button button-primary" />}
            {app.website && (
              <ExternalLink href={app.website} className="button">
                Visit {websiteLabel}
              </ExternalLink>
            )}
          </div>
          <dl className="case-facts">
            {study.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {app.shots && (
          <div className="band case-gallery-band">
            <ul className="wrap case-gallery" aria-label={`${app.name} screenshots`}>
              {app.shots.map((shot) => (
                <li key={shot.src} className={`shot shot-${shot.kind}`}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(max-width: 760px) 70vw, 280px"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {study.sections.map((section, i) => (
          <Section key={section.title} id={`s${i}`} title={section.title} query={section.query}>
            {section.intro && <p className="case-intro">{section.intro}</p>}
            {section.points && (
              <ul className="job-points case-points">
                {section.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
            {section.table && (
              <>
                <table className="sql-table case-table">
                  <thead>
                    <tr>
                      {section.table.columns.map((c) => (
                        <th key={c} scope="col">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, ci) =>
                          ci === 0 ? (
                            <th key={ci} scope="row">
                              {cell}
                            </th>
                          ) : (
                            <td key={ci}>{cell}</td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="result-count">
                  {section.table.rows.length} {section.table.rows.length === 1 ? "row" : "rows"} selected.
                </p>
              </>
            )}
          </Section>
        ))}

        <Section id="stack" title="Stack" query={`SELECT tech FROM ${slug.replace("-", "_")}_stack;`}>
          <Stack items={app.stack} />
          <div className="hero-actions case-end-actions">
            {app.appStore && <AppStoreButton href={app.appStore} className="button button-primary" />}
            <Link href="/#apps" className="button">
              See the other apps
            </Link>
          </div>
        </Section>
      </main>

      <Footer />
      <SqlTerminal />
    </>
  );
}
