/* global React, Reveal */
const { useState, useMemo } = React;

const CATEGORIES = [
  { id: 'all',          label: 'All' },
  { id: 'development',  label: 'Development' },
  { id: 'data-science', label: 'Data Science' },
];

function CatLabel({ id }) {
  const c = CATEGORIES.find((c) => c.id === id);
  return c ? c.label : id;
}

function embedType(src) {
  const ext = src.split('.').pop().toLowerCase();
  if (ext === 'mp4' || ext === 'webm' || ext === 'ogg') return 'video';
  if (ext === 'pdf') return 'pdf';
  if (ext === 'html' || ext === 'htm') return 'html';
  return 'image';
}

function Embed({ src }) {
  const type = embedType(src);

  if (type === 'video') {
    return (
      <div className="proj-embed-wrap">
        <video controls preload="metadata" className="proj-embed proj-embed--video">
          <source src={src} type="video/mp4" />
        </video>
      </div>
    );
  }

  if (type === 'pdf') {
    return (
      <div className="proj-embed-wrap proj-embed-wrap--pdf">
        <div className="proj-embed-pdf-bar">
          <span>{src.split('/').pop()}</span>
          <a href={src} target="_blank" rel="noopener noreferrer" className="proj-embed-pdf-open">
            Open ↗
          </a>
        </div>
        <iframe src={src} className="proj-embed proj-embed--pdf" title="Project document" />
      </div>
    );
  }

  if (type === 'html') {
    return (
      <div className="proj-embed-wrap proj-embed-wrap--pdf">
        <div className="proj-embed-pdf-bar">
          <span>{src.split('/').pop()}</span>
          <a href={src} target="_blank" rel="noopener noreferrer" className="proj-embed-pdf-open">
            Open ↗
          </a>
        </div>
        <iframe src={src} className="proj-embed proj-embed--html" title="Project notebook" />
      </div>
    );
  }

  return (
    <div className="proj-embed-wrap">
      <img src={src} alt="" className="proj-embed proj-embed--img" />
    </div>
  );
}

function ProjectDetail({ project, onBack }) {
  const tags = project.stack.split(' · ');
  const hasExamples = project.examples && project.examples.length > 0;

  return (
    <section className="view view-anim-enter">
      <Reveal>
        <button className="proj-back" onClick={onBack}>
          <span className="proj-back__arrow">←</span> Projects
        </button>
      </Reveal>

      <Reveal delay={60}>
        <div className="proj-detail">
          <div className="proj-detail__header">
            <div className="eyebrow" style={{ marginBottom: 'var(--sp-3)' }}>
              {project.num} — <CatLabel id={project.cat} /> · {project.year}
            </div>
            <h1 className="proj-detail__title">{project.title}</h1>
          </div>

          {hasExamples ? (
            <div className="proj-detail__embeds">
              {project.examples.map((src) => <Embed key={src} src={src} />)}
            </div>
          ) : (
            <div className="proj-detail__thumb">
              <div className="proj-card__placeholder">{project.title}</div>
            </div>
          )}

          <div className="proj-detail__body">
            <p className="proj-detail__desc">{project.desc}</p>

            {project.note && (
              <div className="proj-detail__note">{project.note}</div>
            )}

            <div className="proj-detail__tags">
              {tags.map((t) => (
                <span key={t} className="proj-detail__tag">{t}</span>
              ))}
            </div>

            {project.github && (
              <a
                className="btn btn--ghost proj-detail__github"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub <span className="proj-detail__github-arrow">↗</span>
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Projects({ layout, setLayout }) {
  const PROJECTS = window.CONTENT.projects;

  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(() => {
    const h = (location.hash || '').replace('#', '');
    const parts = h.split('/');
    if (parts[0] === 'projects' && parts[1]) {
      return PROJECTS.find(p => p.id === parts[1]) || null;
    }
    return null;
  });

  const openProject = (p) => {
    history.replaceState(null, '', '#projects/' + p.id);
    setSelected(p);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const closeProject = () => {
    history.replaceState(null, '', '#projects');
    setSelected(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const counts = useMemo(() => {
    const c = { all: PROJECTS.length };
    for (const p of PROJECTS) c[p.cat] = (c[p.cat] || 0) + 1;
    return c;
  }, [PROJECTS]);

  const filtered = useMemo(() => {
    if (filter === 'all') return PROJECTS;
    return PROJECTS.filter((p) => p.cat === filter);
  }, [filter, PROJECTS]);

  if (selected) {
    return <ProjectDetail project={selected} onBack={closeProject} />;
  }

  return (
    <section className="view view-anim-enter">
      <Reveal>
        <div className="proj-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 'var(--sp-3)' }}>02 — Selected work</div>
            <h1>Projects</h1>
          </div>
          <div className="proj-header__count">
            {filtered.length} of {PROJECTS.length} · last updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </div>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <div className="proj-controls">
          <div className="proj-filters" role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className="proj-filter"
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
              >
                {c.label}
                <span className="proj-filter__count">{counts[c.id] || 0}</span>
              </button>
            ))}
          </div>
          <div className="proj-layout-toggle" role="group" aria-label="Layout">
            <button aria-pressed={layout === 'list'} onClick={() => setLayout('list')}>List</button>
            <button aria-pressed={layout === 'grid'} onClick={() => setLayout('grid')}>Grid</button>
          </div>
        </div>
      </Reveal>

      {/* List */}
      {layout === 'list' && (
        <div className="proj-list" key={`list-${filter}`}>
          {filtered.map((p, i) => (
            <Reveal as="a" key={p.id} delay={i * 40} className="proj-row" href={'#projects/' + p.id} onClick={(e) => { e.preventDefault(); openProject(p); }}>
              <span className="proj-row__num">{p.num}</span>
              <div>
                <span className="proj-row__title">
                  {p.title}
                  <span className="proj-row__title-arrow">→</span>
                </span>
                <span className="proj-row__desc">{p.desc}</span>
                <span className="proj-row__stack">{p.stack}</span>
              </div>
              <span className="proj-row__cat"><CatLabel id={p.cat} /></span>
              <span className="proj-row__year">{p.year}</span>
            </Reveal>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 'var(--sp-8) 0', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
              No projects in this category yet.
            </div>
          )}
        </div>
      )}

      {/* Grid */}
      {layout === 'grid' && (
        <div className="proj-grid" key={`grid-${filter}`}>
          {filtered.map((p, i) => (
            <Reveal as="a" key={p.id} delay={i * 50} className="proj-card" href={'#projects/' + p.id} onClick={(e) => { e.preventDefault(); openProject(p); }}>
              <div className="proj-card__thumb">
                {p.thumb
                  ? <img src={p.thumb} alt={p.title} />
                  : <div className="proj-card__placeholder">{p.title}</div>
                }
              </div>
              <div className="proj-card__body">
                <div className="proj-card__cat">
                  <span><CatLabel id={p.cat} /></span>
                  <span>{p.year}</span>
                </div>
                <h3 className="proj-card__title">{p.title}</h3>
                <p className="proj-card__desc">{p.desc}</p>
                <p className="proj-card__stack">{p.stack}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}

    </section>
  );
}

window.Projects = Projects;
