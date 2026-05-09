/* global React */
const { useEffect, useRef } = React;

// IntersectionObserver-driven fade-in. Children get a `.reveal.is-in` flow.
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.body.dataset.anim === 'off') {
      el.classList.add('is-in');
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('is-in');
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Splits a string into per-character spans for the hero.
function SplitText({ text, className }) {
  return (
    <span className={className}>
      {text.split('').map((c, i) => (
        <span
          key={i}
          className="ch"
          style={{ '--i': i }}
          aria-hidden="true"
        >
          {c === ' ' ? '\u00A0' : c}
        </span>
      ))}
      <span style={{
        position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
        overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0
      }}>{text}</span>
    </span>
  );
}

window.Reveal = Reveal;
window.SplitText = SplitText;
