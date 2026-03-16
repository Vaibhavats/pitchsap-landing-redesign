import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ onClose, onSwitchToSignup, onSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email) e.email = 'Please enter your email.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Please enter a valid email.';
    if (!password) e.password = 'Please enter your password.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setErrors({});
    try {
      await login(email, password);
      onSuccess ? onSuccess() : onClose();
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed. Please try again.';
      if (msg.toLowerCase().includes('password')) setErrors({ password: msg });
      else setErrors({ email: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalShell onClose={onClose}>
      <h2 style={{ fontFamily: 'Syne', fontSize: '1.5rem', fontWeight: 800, marginBottom: '.4rem' }}>Welcome back</h2>
      <p style={{ fontSize: '.88rem', color: 'var(--ink-muted)', marginBottom: '1.75rem' }}>Log in to continue building your idea.</p>

      <SocialButtons />
      <div className="divider"><span>or continue with email</span></div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email" placeholder="you@startup.com"
            value={email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <div className="form-error">⚠ {errors.email}</div>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="pwd-wrapper">
            <input
              type={showPwd ? 'text' : 'password'} placeholder="••••••••"
              value={password} onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
              className={errors.password ? 'error' : ''}
            />
            <button type="button" className="pwd-toggle" onClick={() => setShowPwd((p) => !p)} aria-label="Toggle password">
              <EyeIcon open={showPwd} />
            </button>
          </div>
          {errors.password && <div className="form-error">⚠ {errors.password}</div>}
        </div>

        <button type="submit" className="form-submit" disabled={loading}>
          {loading ? 'Logging in…' : 'Log in →'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '.85rem', color: 'var(--ink-muted)' }}>
        Don't have an account?{' '}
        <button onClick={onSwitchToSignup} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '.85rem' }}>
          Sign up free
        </button>
      </div>
    </ModalShell>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

export function ModalShell({ onClose, children }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)', borderRadius: 20, width: '100%', maxWidth: 440,
          padding: '2.5rem', position: 'relative', animation: 'modalIn .25s ease',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem',
            width: 32, height: 32, borderRadius: '50%',
            border: '1px solid var(--border)', background: 'transparent',
            cursor: 'pointer', fontSize: '1rem', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink-muted)', transition: 'all .2s',
          }}
          onMouseEnter={(e) => { e.target.style.background = 'var(--ink)'; e.target.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--ink-muted)'; }}
        >✕</button>
        {children}
      </div>
    </div>
  );
}

export function SocialButtons() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
      {[
        { label: 'Google', icon: <GoogleIcon /> },
        { label: 'LinkedIn', icon: <LinkedInIcon /> },
      ].map(({ label, icon }) => (
        <button key={label} style={{
          padding: '.65rem', border: '1.5px solid var(--border)', borderRadius: 8,
          background: 'transparent', fontSize: '.85rem', cursor: 'pointer',
          fontFamily: 'DM Sans', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '.5rem', color: 'var(--ink)', transition: 'all .2s',
        }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          onClick={() => alert(`${label} OAuth requires a Client ID.\nSee README for setup instructions.`)}
        >
          {icon} {label}
        </button>
      ))}
    </div>
  );
}

export function EyeIcon({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {open ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#0077B5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
