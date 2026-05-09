/* global React */
const { useEffect } = React;

function Header({ route, setRoute, name }) {
  const items = [
    { id: 'about', label: 'Home', num: '01' },
    { id: 'projects', label: 'Projects', num: '02' },
    { id: 'resume', label: 'Resume', num: '03' },
  ];

  // Keyboard shortcut: 1/2/3 to jump
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const map = { '1': 'about', '2': 'projects', '3': 'resume' };
      if (map[e.key]) setRoute(map[e.key]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setRoute]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <button
          className="site-header__brand"
          onClick={() => setRoute('about')}
          aria-label="Home"
        >
          <span className="site-header__brand-mark">·</span>
          <span>{name}</span>
          <span className="site-header__brand-meta">'s Portfolio</span>
        </button>
        <nav className="site-nav" aria-label="Primary">
          {items.map((it) => (
            <button
              key={it.id}
              className="site-nav__item"
              aria-current={route === it.id ? 'page' : undefined}
              onClick={() => setRoute(it.id)}
            >
              {it.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

window.Header = Header;
