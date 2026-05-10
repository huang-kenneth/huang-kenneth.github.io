/* global React, ReactDOM, Header, Footer, About, Projects, Resume,
          TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakSelect, TweakText */
const { useState, useEffect, useMemo, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  name:          window.CONTENT.name,
  tagline:       window.CONTENT.tagline,
  heroVariant:   "type",
  headshotShape: "circle",
  projectLayout: "grid",
  animation:     "full",
  grain:         "on",
  resumePdf:     window.CONTENT.resumePdf,
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState(() => {
    const h = (location.hash || '').replace('#', '');
    const page = h.split('/')[0];
    return ['about', 'projects', 'resume'].includes(page) ? page : 'about';
  });

  // skip replaceState on first render so Projects can keep the initial #projects/id hash
  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return; }
    history.replaceState(null, '', '#' + route);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  useEffect(() => {
    document.body.dataset.anim = tweaks.animation;
    document.body.dataset.grain = tweaks.grain;
  }, [tweaks.animation, tweaks.grain]);

  useEffect(() => {
    if (tweaks.animation !== 'full') return;
    const onMove = (e) => {
      document.documentElement.style.setProperty('--mx', e.clientX + 'px');
      document.documentElement.style.setProperty('--my', e.clientY + 'px');
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [tweaks.animation]);

  const links = [
    { label: 'GitHub', href: 'https://github.com/huang-kenneth' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kennethhuang9/' },
    { label: 'Email', href: 'mailto:kennethhuang9@gmail.com' },
  ];

  return (
    <>
      <div className="spotlight" aria-hidden="true" />
      <Header route={route} setRoute={setRoute} name={tweaks.name} />
      <main className="site-main" data-screen-label={route}>
        {route === 'about' && (
          <About
            name={tweaks.name}
            tagline={tweaks.tagline}
            heroVariant={tweaks.heroVariant}
            headshotShape={tweaks.headshotShape}
          />
        )}
        {route === 'projects' && (
          <Projects
            layout={tweaks.projectLayout}
            setLayout={(v) => setTweak('projectLayout', v)}
          />
        )}
        {route === 'resume' && <Resume name={tweaks.name} pdfUrl={tweaks.resumePdf} />}
      </main>
      <Footer links={links} year={new Date().getFullYear()} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Identity">
          <TweakText label="Name" value={tweaks.name} onChange={(v) => setTweak('name', v)} />
          <TweakText label="Tagline" value={tweaks.tagline} onChange={(v) => setTweak('tagline', v)} />
        </TweakSection>
        <TweakSection label="Hero variant">
          <TweakRadio
            value={tweaks.heroVariant}
            onChange={(v) => setTweak('heroVariant', v)}
            options={[
              { value: 'name', label: 'Name' },
              { value: 'type', label: 'Type' },
              { value: 'card', label: 'Card' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Headshot">
          <TweakRadio
            value={tweaks.headshotShape}
            onChange={(v) => setTweak('headshotShape', v)}
            options={[
              { value: 'circle', label: 'Circle' },
              { value: 'square', label: 'Square' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Resume PDF URL">
          <TweakText value={tweaks.resumePdf} onChange={(v) => setTweak('resumePdf', v)} />
        </TweakSection>
        <TweakSection label="Projects">
          <TweakRadio
            value={tweaks.projectLayout}
            onChange={(v) => setTweak('projectLayout', v)}
            options={[
              { value: 'list', label: 'List' },
              { value: 'grid', label: 'Grid' },
              { value: 'featured', label: 'Featured' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Animation">
          <TweakRadio
            value={tweaks.animation}
            onChange={(v) => setTweak('animation', v)}
            options={[
              { value: 'off', label: 'Off' },
              { value: 'subtle', label: 'Subtle' },
              { value: 'full', label: 'Full' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Grain">
          <TweakRadio
            value={tweaks.grain}
            onChange={(v) => setTweak('grain', v)}
            options={[
              { value: 'off', label: 'Off' },
              { value: 'on', label: 'On' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
