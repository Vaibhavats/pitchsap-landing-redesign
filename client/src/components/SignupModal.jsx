import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ModalShell, SocialButtons, EyeIcon } from './LoginModal';

export default function SignupModal({ onClose, onSwitchToLogin, onSuccess }) {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email) e.email = 'Please enter your email.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.password) e.password = 'Please enter a password.';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setErrors({});
    try {
      await signup(form.name.trim(), form.email, form.password);
      onSuccess ? onSuccess() : onClose();
    } catch (err) {
      const msg = err.response?.data?.error || 'Signup failed. Please try again.';
      if (msg.toLowerCase().includes('email')) setErrors({ email: msg });
      else if (msg.toLowerCase().includes('password')) setErrors({ password: msg });
      else setErrors({ name: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalShell onClose={onClose}>
      <h2 style={{ fontFamily: 'Syne', fontSize: '1.5rem', fontWeight: 800, marginBottom: '.4rem' }}>Start your journey</h2>
      <p style={{ fontSize: '.88rem', color: 'var(--ink-muted)', marginBottom: '1.75rem' }}>Create a free account and validate your idea today.</p>

      <SocialButtons />
      <div className="divider"><span>or continue with email</span></div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Full name</label>
          <input type="text" placeholder="Alex Sharma" value={form.name} onChange={set('name')} className={errors.name ? 'error' : ''} />
          {errors.name && <div className="form-error">⚠ {errors.name}</div>}
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input type="email" placeholder="you@startup.com" value={form.email} onChange={set('email')} className={errors.email ? 'error' : ''} />
          {errors.email && <div className="form-error">⚠ {errors.email}</div>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="pwd-wrapper">
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={form.password} onChange={set('password')}
              className={errors.password ? 'error' : ''}
            />
            <button type="button" className="pwd-toggle" onClick={() => setShowPwd((p) => !p)} aria-label="Toggle password">
              <EyeIcon open={showPwd} />
            </button>
          </div>
          {errors.password && <div className="form-error">⚠ {errors.password}</div>}
        </div>

        <button type="submit" className="form-submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account →'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '.85rem', color: 'var(--ink-muted)' }}>
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '.85rem' }}>
          Log in
        </button>
      </div>
    </ModalShell>
  );
}
