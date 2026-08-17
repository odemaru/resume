import { resume as r } from '@/lib/resume';
import { TopBar } from '@/components/TopBar';
import { PhoneIcon, MailIcon, GitHubIcon } from '@/components/icons';

function Chips({ items, mono }: { items: string[]; mono?: boolean }) {
  if (!items?.length) return null;
  return (
    <div className="chips">
      {items.map((s) => (
        <span key={s} className={mono ? 'chip mono' : 'chip'}>
          {s}
        </span>
      ))}
    </div>
  );
}

function points(n: number) {
  const last = n % 10;
  const tens = n % 100;
  if (tens >= 11 && tens <= 14) return 'пунктов';
  if (last === 1) return 'пункт';
  if (last >= 2 && last <= 4) return 'пункта';
  return 'пунктов';
}

export default function Home() {
  const telHref = `tel:${r.contacts.phone.replace(/[^+\d]/g, '')}`;
  const ghShort = r.contacts.github.replace('https://', '');

  return (
    <>
      <TopBar />
      <main className="container">
        {/* ---------- Hero ---------- */}
        <header className="hero">
          <div className="hero-avatar">ТГ</div>
          <div className="hero-eyebrow">
            <span className="pulse" /> Открыт к предложениям
          </div>
          <h1 className="hero-name">{r.name}</h1>
          <p className="hero-title">
            <b>{r.title}</b> · опыт {r.experienceTotal}
          </p>
          <p className="hero-tagline">{r.tagline}</p>

          <div className="facts">
            <div className="fact">
              <div className="fact-label">Город</div>
              <div className="fact-value">{r.location}</div>
            </div>
            <div className="fact">
              <div className="fact-label">Возраст</div>
              <div className="fact-value">{r.age} года</div>
            </div>
            <div className="fact">
              <div className="fact-label">Формат работы</div>
              <div className="fact-value">{r.workFormats.join(', ')}</div>
            </div>
            <div className="fact">
              <div className="fact-label">Занятость</div>
              <div className="fact-value">{r.employmentTypes.join(', ')}</div>
            </div>
          </div>

          <div className="contact-row">
            <a className="contact" href={telHref}>
              <PhoneIcon /> {r.contacts.phone}
            </a>
            <a className="contact" href={`mailto:${r.contacts.email}`}>
              <MailIcon /> {r.contacts.email}
            </a>
            <a className="contact" href={r.contacts.github} target="_blank" rel="noreferrer">
              <GitHubIcon /> {ghShort}
            </a>
          </div>
        </header>

        {/* ---------- О себе ---------- */}
        <section className="section">
          <h2 className="section-title">О себе</h2>
          <p className="about-text">{r.about}</p>
        </section>

        {/* ---------- Опыт ---------- */}
        <section className="section">
          <h2 className="section-title">Опыт работы</h2>
          {r.experience.map((job) => (
            <div className="job" key={job.company}>
              <div className="job-header">
                <div>
                  <div className="job-company">
                    {job.companyUrl ? (
                      <a href={job.companyUrl} target="_blank" rel="noreferrer">
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                    {job.current && (
                      <span className="badge-current">
                        <span className="pulse" style={{ width: 6, height: 6 }} /> сейчас
                      </span>
                    )}
                  </div>
                  <div className="job-role">{job.role}</div>
                  {job.industry && <div className="job-industry">{job.industry}</div>}
                </div>
                <div className="job-period">
                  {job.period}
                  <br />
                  <span className="job-duration">{job.duration}</span>
                </div>
              </div>

              {job.projects.map((p) => (
                <article className="project" key={p.name}>
                  <div className="project-header">
                    <div className="project-name">
                      {p.url ? (
                        <a href={p.url} target="_blank" rel="noreferrer">
                          {p.name}
                        </a>
                      ) : (
                        p.name
                      )}
                    </div>
                    <span className="project-role">{p.role}</span>
                  </div>
                  {p.summary && <p className="project-summary">{p.summary}</p>}
                  <Chips items={p.stack} mono />
                  {p.brands && p.brands.length > 0 && (
                    <div className="brands">
                      {p.brands.map((b) => (
                        <span key={b} className="brand-chip">
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                  {p.highlights.length > 0 && (
                    <details className="details">
                      <summary className="details-summary">
                        Что внутри — {p.highlights.length} {points(p.highlights.length)}
                      </summary>
                      <ul className="highlights">
                        {p.highlights.map((h) => (
                          <li className="highlight" key={h.title}>
                            <span className="highlight-title">{h.title}.</span> {h.text}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                  {p.metrics && p.metrics.length > 0 && (
                    <div className="metrics">
                      {p.metrics.map((m) => (
                        <span key={m} className="metric">
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          ))}
        </section>

        {/* ---------- Навыки ---------- */}
        <section className="section">
          <h2 className="section-title">Навыки</h2>
          <div className="skills-grid">
            {r.skills.map((g) => (
              <div className="skill-group" key={g.group}>
                <div className="skill-group-title">{g.group}</div>
                <Chips items={g.items} />
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Образование и языки ---------- */}
        <section className="section">
          <h2 className="section-title">Образование и языки</h2>
          <div className="cards">
            {r.education.map((e) => (
              <div className="card" key={e.institution}>
                <div className="card-title">{e.institution}</div>
                <div className="card-sub">
                  {e.degree} · {e.year}
                </div>
                <div className="card-meta">
                  {e.faculty} · {e.location}
                </div>
              </div>
            ))}
            <div className="card">
              <div className="card-title">Языки</div>
              {r.languages.map((l) => (
                <div className="lang-row" key={l.name}>
                  <span>{l.name}</span>
                  <span className="lang-level">{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Пет-проекты ---------- */}
        <section className="section">
          <h2 className="section-title">Пет-проекты</h2>
          <div className="cards">
            {r.petProjects.map((p) => (
              <div className="card" key={p.name}>
                <div className="card-title">{p.name}</div>
                <p className="pet-desc">{p.description}</p>
                {p.url && (
                  <a className="contact" style={{ marginTop: 14 }} href={p.url} target="_blank" rel="noreferrer">
                    <GitHubIcon /> Открыть на GitHub
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div>
            © {new Date().getFullYear()} {r.shortName} · {r.title}
          </div>
          <div className="footer-note">
            Next.js + React · <a href="vue/">та же страница на Vue</a>
          </div>
        </div>
      </footer>
    </>
  );
}
