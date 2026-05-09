/* global React, Reveal, SplitText */

function About({ name, tagline, heroVariant, headshotShape }) {
  const { meta, bio, skills, links } = window.CONTENT;

  const slotShape = headshotShape === 'circle' ? 'circle' : 'rect';

  const Headshot = (
    <div className={`headshot headshot--${headshotShape}`}>
      <image-slot id="headshot" shape={slotShape} placeholder="Drop your headshot" src="assets/headshot.jpg"></image-slot>
    </div>
  );

  return (
    <section className="view view-anim-enter" key={heroVariant}>
      <div className={`hero ${heroVariant === 'type' ? 'hero--type' : ''} ${heroVariant === 'card' ? 'hero--card' : ''}`}>
        {heroVariant === 'card' ? (
          <div className="hero__inner">
            <div className="hero__row">
              {Headshot}
              <div className="hero__col">
                <h1 className="hero__name"><SplitText text={name} /></h1>
                <p className="hero__tagline">{tagline}</p>
              </div>
            </div>
            <dl className="hero__meta" style={{ borderTop: '1px solid var(--border-faint)', paddingTop: 'var(--sp-5)' }}>
              {meta.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : (
          <>
            <div className="hero__row">
              {Headshot}
              <div className="hero__col">
                <h1 className="hero__name">
                  <SplitText text={name} />
                  <span className="caret" aria-hidden="true" />
                </h1>
                <p className="hero__tagline">{tagline}</p>
              </div>
            </div>
            <dl className="hero__meta">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </>
        )}
      </div>

      <div className="section-label">01 — About</div>
      <div className="prose">
        {bio.map((p, i) => (
          <p key={i} className={i === 0 ? 'lede' : ''}
             style={i === 0 ? { fontSize: 'var(--text-lg)', color: 'var(--fg-1)' } : {}}>
            {p}
          </p>
        ))}
      </div>

      <div className="section-label">02 — Things I work with</div>
      <ul className="skill-list">
        {skills.map((s) => <li key={s}>{s}</li>)}
      </ul>

      <div className="section-label">03 — Contact</div>
      <div className="prose">
        <p>
          The fastest way to reach me is over email at{' '}
          <a href={`mailto:${window.CONTENT.email}`}>{window.CONTENT.email}</a>. I'm also on{' '}
          {links.filter(l => l.label !== 'Email').map((l, i, arr) => (
            <span key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
              {i < arr.length - 1 ? ', ' : ' '}
            </span>
          ))}
          — though I answer email faster.
        </p>
      </div>
    </section>
  );
}

window.About = About;
