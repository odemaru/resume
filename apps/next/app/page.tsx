import { resume as r } from '@/lib/resume';
import { TopBar } from '@/components/TopBar';
import { PhoneIcon, MailIcon, GitHubIcon, ChevronIcon } from '@/components/icons';

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

export default function Home() {
  const telHref = `tel:${r.contacts.phone.replace(/[^+\d]/g, '')}`;
  const ghShort = r.contacts.github.replace('https://', '');

  const facts: [string, string][] = [
    ['Город', r.location],
    ['Возраст', `${r.age} года`],
    ['Формат работы', r.workFormats.join(', ')],
    ['Занятость', r.employmentTypes.join(', ')],
  ];

  return (
    <>
      <TopBar />
      <main className="container">
        <div className="bento">
          <header className="card hero span-3">
            <div className="hero-avatar">ТГ</div>
            <div className="hero-eyebrow">
              <span className="pulse" /> Открыт к предложениям
            </div>
            <h1 className="hero-name">{r.name}</h1>
            <p className="hero-title">
              <b>{r.title}</b> · опыт {r.experienceTotal}
            </p>
            <p className="hero-tagline">{r.tagline}</p>
          </header>

          <section className="card span-1">
            <div className="card-label">Контакты</div>
            <div className="contact-list">
              <a className="contact-line" href={telHref}>
                <PhoneIcon />
                <div>
                  <div className="contact-k">Телефон</div>
                  <div className="contact-v">{r.contacts.phone}</div>
                </div>
              </a>
              <a className="contact-line" href={`mailto:${r.contacts.email}`}>
                <MailIcon />
                <div>
                  <div className="contact-k">Почта</div>
                  <div className="contact-v">{r.contacts.email}</div>
                </div>
              </a>
              <a className="contact-line" href={r.contacts.github} target="_blank" rel="noreferrer">
                <GitHubIcon />
                <div>
                  <div className="contact-k">GitHub</div>
                  <div className="contact-v">{ghShort}</div>
                </div>
              </a>
            </div>
          </section>

          {facts.map(([label, value]) => (
            <div className="card fact span-1" key={label}>
              <div className="fact-label">{label}</div>
              <div className="fact-value">{value}</div>
            </div>
          ))}

          <section className="card span-4">
            <div className="card-label">О себе</div>
            <p className="about-text">{r.about}</p>
          </section>

          {r.experience.map((job) => (
            <section className="card span-4" key={job.company}>
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

              {job.projects.map((p, i) => (
                <details className="proj" key={p.name} open={job.current && i === 0 ? true : undefined}>
                  <summary>
                    <span>
                      <span className="project-name">{p.name}</span>
                      <span className="project-role">{p.role}</span>
                    </span>
                    <span className="chev">
                      <ChevronIcon />
                    </span>
                  </summary>
                  <div className="proj-body">
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
                      <ul className="highlights">
                        {p.highlights.map((h) => (
                          <li className="highlight" key={h.title}>
                            <span className="highlight-title">{h.title}.</span> {h.text}
                          </li>
                        ))}
                      </ul>
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
                  </div>
                </details>
              ))}
            </section>
          ))}

          <section className="card span-4">
            <div className="card-label">Навыки</div>
            <div className="skills-grid">
              {r.skills.map((g) => (
                <div className="skill-group" key={g.group}>
                  <div className="skill-group-title">{g.group}</div>
                  <Chips items={g.items} />
                </div>
              ))}
            </div>
          </section>

          <section className="card span-2">
            <div className="card-label">Образование</div>
            {r.education.map((e) => (
              <div key={e.institution}>
                <div className="card-title">{e.institution}</div>
                <div className="card-sub">
                  {e.degree} · {e.year}
                </div>
                <div className="card-meta">
                  {e.faculty} · {e.location}
                </div>
              </div>
            ))}
          </section>

          <section className="card span-2">
            <div className="card-label">Языки</div>
            {r.languages.map((l) => (
              <div className="lang-row" key={l.name}>
                <span>{l.name}</span>
                <span className="lang-level">{l.level}</span>
              </div>
            ))}
          </section>

          <section className="card span-4">
            <div className="card-label">Пет-проекты</div>
            {r.petProjects.map((p) => (
              <div key={p.name}>
                <div className="card-title">{p.name}</div>
                <p className="pet-desc">{p.description}</p>
                {p.url && (
                  <a className="contact-line" style={{ marginTop: 12 }} href={p.url} target="_blank" rel="noreferrer">
                    <GitHubIcon /> Открыть на GitHub
                  </a>
                )}
              </div>
            ))}
          </section>
        </div>
      </main>

      <footer className="footer">
        <div>
          © {new Date().getFullYear()} {r.shortName} · {r.title}
        </div>
        <div className="footer-note">
          Next.js + React · <a href="vue/">та же страница на Vue</a>
        </div>
      </footer>
    </>
  );
}
