/* global React */

function Footer({ links, year }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>© {year} — built with care · last updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
        <div className="site-footer__links">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
