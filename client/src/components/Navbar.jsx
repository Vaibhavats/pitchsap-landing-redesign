import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenLogin, onOpenSignup, onOpenChat }) {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '';

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 5%', height: 68,
        background: 'rgba(250,249,246,0.92)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
        transition: 'box-shadow .3s',
      }}>
        {/* Logo */}
        <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.5px' }}>
          Pitch<span style={{ color: 'var(--accent)' }}>SAP</span>
        </div>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0 }} className="nav-links-desktop">
          {['how-it-works', 'roles', 'features', 'testimonials'].map((id) => (
            <li key={id}>
              <button onClick={() => scrollTo(id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--ink-muted)', fontSize: '.93rem',
                fontFamily: 'DM Sans', textTransform: 'capitalize',
              }}>
                {id.replace(/-/g, ' ')}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center' }}>
          {user ? (
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--accent)', border: 'none', cursor: 'pointer',
                  color: '#fff', fontSize: '.85rem', fontWeight: 700,
                  fontFamily: 'Syne', transition: 'transform .2s',
                }}
              >{initials}</button>
              {dropdownOpen && (
                <div style={{
                  position: 'absolute', top: 44, right: 0,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '.5rem', minWidth: 190,
                  boxShadow: 'var(--shadow)', zIndex: 200,
                }}>
                  <div style={{ padding: '.6rem .9rem .4rem', fontSize: '.82rem', color: 'var(--ink-muted)', borderBottom: '1px solid var(--border)', marginBottom: '.25rem' }}>
                    {user.email}
                  </div>
                  {[
                    { label: '💬 AI Chat', action: () => { onOpenChat(); setDropdownOpen(false); } },
                    { label: '← Log out', action: logout, danger: true },
                  ].map(({ label, action, danger }) => (
                    <button key={label} onClick={action} style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '.6rem .9rem', fontSize: '.88rem',
                      color: danger ? 'var(--accent)' : 'var(--ink)',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      borderRadius: 8, fontFamily: 'DM Sans', transition: 'background .2s',
                    }}
                      onMouseEnter={(e) => e.target.style.background = 'var(--bg)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >{label}</button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={onOpenLogin}>Log in</button>
              <button className="btn btn-primary" onClick={onOpenSignup}>Get started →</button>
            </>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            className="hamburger-btn"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: 22, height: 2, background: 'var(--ink)', borderRadius: 2, display: 'block' }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 68, left: 0, right: 0, zIndex: 99,
          background: 'var(--bg-card)', borderBottom: '1px solid var(--border)',
          padding: '1.5rem 5%', display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          {['how-it-works', 'roles', 'features', 'testimonials'].map((id) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
              color: 'var(--ink-muted)', fontSize: '1rem', fontFamily: 'DM Sans',
              padding: '.5rem 0', borderBottom: '1px solid var(--border)', textTransform: 'capitalize',
            }}>
              {id.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
