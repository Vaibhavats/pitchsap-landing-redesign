import { useAuth } from '../context/AuthContext';

export default function Home({ onOpenSignup, onOpenChat }) {
  const { user } = useAuth();
  const handleCTA = () => user ? onOpenChat() : onOpenSignup();

  return (
    <>
      <HeroSection handleCTA={handleCTA} user={user} />
      <RolesSection handleCTA={handleCTA} user={user} />
      <HowItWorksSection />
      <FeaturesSection handleCTA={handleCTA} user={user} />
      <TestimonialsSection />
      <CTASection handleCTA={handleCTA} user={user} />
      <Footer />
    </>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────────── */
function HeroSection({ handleCTA, user }) {
  return (
    <section style={{
      minHeight: '100vh', padding: '140px 5% 80px',
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      alignItems: 'center', gap: '4rem',
    }} className="hero-section">
      <div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '.5rem',
          background: 'var(--accent-soft)', color: 'var(--accent)',
          borderRadius: 100, padding: '.35rem 1rem', fontSize: '.82rem',
          fontWeight: 500, marginBottom: '1.5rem',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2s infinite', display: 'inline-block' }} />
          Now live — AI-powered idea validation
        </div>

        <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: '1.5rem' }}>
          Turn raw ideas into{' '}
          <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>funded</span>{' '}
          ventures.
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'var(--ink-muted)', maxWidth: 460, marginBottom: '2.5rem', fontWeight: 300 }}>
          PitchSAP connects Ideators with Investors, Mentors & Builders. Validate, refine, and pitch your startup idea with the power of AI.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <button className="btn btn-primary" style={{ padding: '.75rem 2rem', fontSize: '1rem' }} onClick={handleCTA}>
            {user ? 'Open AI Chat →' : 'Start as Ideator →'}
          </button>
          <button className="btn btn-ghost" style={{ padding: '.75rem 1.5rem', fontSize: '1rem' }}
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
            How it works
          </button>
        </div>

        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {[['4,200+', 'Ideas validated'], ['$12M+', 'Raised by ideators'], ['850+', 'Active investors']].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: 'Syne', fontSize: '1.6rem', fontWeight: 800 }}>{num}</div>
              <div style={{ fontSize: '.82rem', color: 'var(--ink-muted)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Card */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', top: -16, right: -10,
          background: 'var(--green)', color: '#fff',
          borderRadius: 100, padding: '.4rem .9rem',
          fontSize: '.78rem', fontWeight: 500,
          boxShadow: '0 4px 16px rgba(0,184,122,.3)', zIndex: 2,
        }}>✦ Match found!</div>

        <div style={{
          background: 'var(--bg-card)', borderRadius: 20,
          border: '1px solid var(--border)', padding: '1.75rem',
          boxShadow: 'var(--shadow)', animation: 'floatUp 6s ease-in-out infinite',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
            <span style={{ background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: '.75rem', padding: '.25rem .7rem', borderRadius: 100, fontWeight: 500 }}>Ideator</span>
            <span style={{ background: '#e8f8f0', color: '#00875a', fontSize: '.75rem', padding: '.25rem .7rem', borderRadius: 100, fontWeight: 500 }}>✓ Validated</span>
          </div>
          <div style={{ fontFamily: 'Syne', fontSize: '1.15rem', fontWeight: 700, marginBottom: '.5rem' }}>EcoRoute — Smart Last-Mile Delivery</div>
          <div style={{ fontSize: '.88rem', color: 'var(--ink-muted)', marginBottom: '1.2rem', lineHeight: 1.6 }}>
            AI-optimized sustainable delivery routing for urban e-commerce. Reduces carbon footprint by 40%.
          </div>
          {[['Market Fit', 87, 'var(--accent)'], ['Investor Interest', 73, 'var(--ink)']].map(([label, val, color]) => (
            <div key={label} style={{ marginBottom: '.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.35rem' }}>
                <span style={{ fontSize: '.78rem', color: 'var(--ink-muted)' }}>{label}</span>
                <span style={{ fontSize: '.78rem', fontWeight: 600 }}>{val}%</span>
              </div>
              <div style={{ height: 6, background: '#eee', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${val}%`, height: '100%', borderRadius: 3, background: color, animation: 'fillBar 1.5s ease-out .5s both' }} />
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              {[['VC', '#ff4d1c'], ['M', '#1a1a2e'], ['+3', '#00b87a']].map(([label, bg], i) => (
                <div key={label} style={{
                  width: 28, height: 28, borderRadius: '50%', background: bg,
                  border: '2px solid #fff', marginLeft: i > 0 ? -8 : 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '.65rem', fontWeight: 700, color: '#fff',
                }}>{label}</div>
              ))}
            </div>
            <span style={{ fontSize: '.8rem', color: 'var(--accent)', fontWeight: 500 }}>6 interested →</span>
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: -20, left: -30,
          background: 'var(--ink)', color: '#fff',
          borderRadius: '12px 12px 12px 2px', padding: '.75rem 1rem',
          fontSize: '.82rem', maxWidth: 220, lineHeight: 1.5,
          boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
        }}>
          <div style={{ fontSize: '.7rem', opacity: .6, marginBottom: '.25rem', fontFamily: 'Syne' }}>✦ AI Insight</div>
          Your market timing is exceptional. Sustainable logistics is up 340% YoY.
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-section { grid-template-columns: 1fr !important; padding-top: 120px !important; }
          .hero-section > div:last-child { order: -1; }
        }
      `}</style>
    </section>
  );
}

/* ── Roles ─────────────────────────────────────────────────────────────────── */
function RolesSection({ handleCTA, user }) {
  const roles = [
    { icon: '💡', title: 'Ideator', desc: 'Submit your startup idea, get AI-powered validation scores, connect with mentors, and pitch to investors — all in one place.', featured: true },
    { icon: '🎯', title: 'Investor', desc: 'Discover pre-vetted, AI-scored startup ideas. Set criteria, receive smart matches, and engage with promising founders.' },
    { icon: '🧭', title: 'Mentor', desc: 'Guide early-stage founders with your expertise. Offer structured mentorship sessions and track your portfolio\'s progress.' },
    { icon: '⚙️', title: 'Builder / CTO', desc: 'Find exciting ideas that need technical co-founders or development expertise. Collaborate and build equity-based.' },
    { icon: '📊', title: 'Analyst', desc: 'Conduct deep market research, validate assumptions with data, and generate investment-ready reports for stakeholders.' },
    { icon: '🏢', title: 'Accelerator', desc: 'Source the best cohort candidates. Run applications, track milestones, and manage demo days from one dashboard.' },
  ];

  return (
    <section id="roles" style={{ background: 'var(--ink)', color: '#fff', padding: '100px 5%' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="section-tag" style={{ color: '#ff6b3d' }}>Platform Roles</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3.5rem' }}>
          <h2 className="section-title" style={{ color: '#fff', maxWidth: 480 }}>Every player in the startup ecosystem.</h2>
          <p className="section-sub">One platform connecting all the right people at every stage.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="roles-grid">
          {roles.map((r) => (
            <div key={r.title} onClick={handleCTA} style={{
              border: `1px solid ${r.featured ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
              background: r.featured ? 'rgba(255,77,28,0.08)' : 'transparent',
              borderRadius: 'var(--radius)', padding: '2rem', cursor: 'pointer',
              position: 'relative', overflow: 'hidden', transition: 'all .3s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(255,77,28,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = r.featured ? 'var(--accent)' : 'rgba(255,255,255,0.1)'; }}
            >
              {r.featured && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--accent)', color: '#fff', fontSize: '.7rem', padding: '.2rem .6rem', borderRadius: 100, fontWeight: 600 }}>✦ Featured</div>
              )}
              <div style={{ width: 48, height: 48, borderRadius: 12, background: r.featured ? 'rgba(255,77,28,0.2)' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1.25rem' }}>{r.icon}</div>
              <h3 style={{ fontFamily: 'Syne', fontSize: '1.15rem', fontWeight: 700, marginBottom: '.6rem', color: '#fff' }}>{r.title}</h3>
              <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.65 }}>{r.desc}</p>
              {r.featured && <div style={{ marginTop: '1.25rem', color: 'var(--accent)', fontSize: '.85rem', fontWeight: 500 }}>{user ? 'Open AI Chat →' : 'Start here →'}</div>}
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.roles-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}

/* ── How It Works ──────────────────────────────────────────────────────────── */
function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Submit your idea', desc: 'Fill a structured brief — problem, solution, market. Takes under 10 minutes.' },
    { num: '02', title: 'AI validation', desc: 'Our AI scores market fit, competition, timing, and provides actionable feedback.' },
    { num: '03', title: 'Refine with mentors', desc: 'Chat with domain experts who\'ve built companies in your space.' },
    { num: '04', title: 'Pitch investors', desc: 'Get matched with relevant investors. Present your validated pitch deck live.' },
  ];

  return (
    <section id="how-it-works" style={{ padding: '100px 5%' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="section-tag">For Ideators</div>
        <h2 className="section-title">From idea to investment in 4 steps.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2rem', marginTop: '3.5rem', position: 'relative' }} className="steps-grid">
          <div style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 1, background: 'repeating-linear-gradient(90deg,var(--border) 0,var(--border) 12px,transparent 12px,transparent 20px)' }} className="steps-line" />
          {steps.map((s) => (
            <div key={s.num} style={{ textAlign: 'center' }}
              onMouseEnter={(e) => { const n = e.currentTarget.querySelector('.step-num'); n.style.background = 'var(--accent)'; n.style.color = '#fff'; n.style.transform = 'scale(1.08)'; }}
              onMouseLeave={(e) => { const n = e.currentTarget.querySelector('.step-num'); n.style.background = 'var(--bg-card)'; n.style.color = 'var(--ink)'; n.style.transform = 'scale(1)'; }}
            >
              <div className="step-num" style={{ width: 72, height: 72, borderRadius: '50%', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne', fontSize: '1.3rem', fontWeight: 800, margin: '0 auto 1.25rem', background: 'var(--bg-card)', position: 'relative', zIndex: 1, transition: 'all .3s' }}>{s.num}</div>
              <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '.5rem' }}>{s.title}</h4>
              <p style={{ fontSize: '.86rem', color: 'var(--ink-muted)', lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.steps-grid{grid-template-columns:1fr 1fr !important;}.steps-line{display:none !important;}}@media(max-width:600px){.steps-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}

/* ── Features ──────────────────────────────────────────────────────────────── */
function FeaturesSection({ handleCTA, user }) {
  return (
    <section id="features" style={{ background: 'var(--bg-card)', padding: '100px 5%' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="section-tag">Platform Features</div>
        <h2 className="section-title">Everything an Ideator needs.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '3.5rem' }} className="features-grid">
          {[
            { icon: '🧠', title: 'AI Idea Scoring', desc: 'Get instant scores across 8 dimensions including market size, competition, and founder-market fit. Backed by real data.' },
            { icon: '📋', title: 'Pitch Deck Builder', desc: 'Drag-and-drop pitch deck creator with AI-generated content suggestions. Export to PDF in one click.' },
            { icon: '🤝', title: 'Smart Matching', desc: 'Our algorithm matches your idea with relevant investors, mentors, and co-founders based on domain and stage.' },
            { icon: '📈', title: 'Progress Dashboard', desc: 'Track your idea\'s journey — views, investor interest, mentor feedback, and milestone completions — all in one place.' },
          ].map((f) => (
            <div key={f.title} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem', background: 'var(--bg-card)', transition: 'all .3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'rgba(255,77,28,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Syne', fontSize: '1.15rem', fontWeight: 700, marginBottom: '.6rem' }}>{f.title}</h3>
              <p style={{ fontSize: '.88rem', color: 'var(--ink-muted)', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}

          {/* Wide chat card */}
          <div style={{ gridColumn: 'span 2', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem', background: 'var(--bg-card)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }} className="chat-feature-card">
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
              <h3 style={{ fontFamily: 'Syne', fontSize: '1.15rem', fontWeight: 700, marginBottom: '.6rem' }}>AI Chat Assistant</h3>
              <p style={{ fontSize: '.88rem', color: 'var(--ink-muted)', lineHeight: 1.65 }}>Your 24/7 startup advisor. Ask anything — from validating assumptions to crafting investor emails. Context-aware and idea-specific.</p>
              <button className="btn btn-dark" style={{ marginTop: '1.5rem' }} onClick={handleCTA}>
                {user ? 'Open Chat →' : 'Try AI Chat →'}
              </button>
            </div>
            <div style={{ background: 'var(--bg)', borderRadius: 10, padding: '1.25rem' }}>
              {[
                { role: 'user', text: 'How big is the last-mile delivery market?' },
                { role: 'ai', text: 'The global last-mile delivery market was valued at $108B in 2023, projected to reach $340B by 2030. Sustainable variants are growing 3x faster.' },
                { role: 'user', text: 'Who are my top 3 competitors?' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem', marginBottom: '.75rem' }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: m.role === 'ai' ? 'var(--ink)' : '#eee', color: m.role === 'ai' ? '#fff' : 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', fontWeight: 600, flexShrink: 0 }}>
                    {m.role === 'ai' ? 'AI' : 'U'}
                  </div>
                  <div style={{ background: m.role === 'ai' ? 'var(--ink)' : '#fff', color: m.role === 'ai' ? '#fff' : 'var(--ink)', border: m.role === 'ai' ? 'none' : '1px solid var(--border)', borderRadius: m.role === 'ai' ? '10px 10px 10px 0' : '0 10px 10px 10px', padding: '.6rem .85rem', fontSize: '.82rem', lineHeight: 1.5 }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.features-grid{grid-template-columns:1fr !important;}.chat-feature-card{grid-column:span 1 !important;grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}

/* ── Testimonials ──────────────────────────────────────────────────────────── */
function TestimonialsSection() {
  const testimonials = [
    { stars: 5, text: '"I submitted my agritech idea on a Sunday evening. By Wednesday I had 3 investor intro calls booked. The AI validation report was the door-opener."', name: 'Rahul Kumar', role: 'Founder, FarmLink AI · Raised ₹2.4Cr', initials: 'RK', color: '#ff4d1c' },
    { stars: 5, text: '"The mentor matching feature is incredible. I got paired with someone who\'d built and sold two companies in my exact space. That kind of access is priceless."', name: 'Priya Sharma', role: 'Founder, MediQuick · YC S24', initials: 'PS', color: '#1a1a2e' },
    { stars: 5, text: '"As a non-technical founder, the AI chat was my secret weapon. It helped me understand the technical landscape well enough to hold informed conversations with CTOs."', name: 'Arjun Mehta', role: 'Founder, SkillBridge · $180K pre-seed', initials: 'AM', color: '#00b87a' },
  ];

  return (
    <section id="testimonials" style={{ background: 'var(--accent-soft)', padding: '100px 5%' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="section-tag">Success Stories</div>
        <h2 className="section-title">Ideators who made it happen.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', marginTop: '3rem' }} className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius)', padding: '1.75rem', border: '1px solid var(--border)' }}>
              <div style={{ color: '#ffc107', fontSize: '.85rem', marginBottom: '.75rem' }}>{'★'.repeat(t.stars)}</div>
              <p style={{ fontSize: '.93rem', lineHeight: 1.7, marginBottom: '1.25rem', fontStyle: 'italic' }}>{t.text}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.85rem', fontWeight: 700 }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize: '.9rem', fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: '.78rem', color: 'var(--ink-muted)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.testimonials-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}

/* ── CTA ───────────────────────────────────────────────────────────────────── */
function CTASection({ handleCTA, user }) {
  return (
    <section style={{ background: 'var(--ink)', color: '#fff', padding: '120px 5%', textAlign: 'center' }}>
      <div className="section-tag" style={{ color: '#ff6b3d' }}>Ready to launch?</div>
      <h2 className="section-title" style={{ color: '#fff', maxWidth: 640, margin: '0 auto 1.25rem' }}>Your idea deserves a real shot.</h2>
      <p style={{ color: 'rgba(255,255,255,.55)', marginBottom: '2.5rem', fontWeight: 300 }}>Join 4,200+ ideators who've turned their concepts into companies. Free to start, always.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" style={{ padding: '.85rem 2.5rem', fontSize: '1rem' }} onClick={handleCTA}>
          {user ? 'Open AI Chat →' : 'Create free account →'}
        </button>
        <button className="btn btn-ghost" style={{ padding: '.85rem 1.75rem', fontSize: '1rem', borderColor: 'rgba(255,255,255,.2)', color: '#fff' }}
          onClick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}>
          Explore all roles
        </button>
      </div>
    </section>
  );
}

/* ── Footer ────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', color: 'rgba(255,255,255,.4)', padding: '3rem 5%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>
          Pitch<span style={{ color: 'var(--accent)' }}>SAP</span>
          <span style={{ fontSize: '.75rem', opacity: .4, fontFamily: 'DM Sans', fontWeight: 300 }}> — Startup Action Platform</span>
        </div>
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
          {['Privacy', 'Terms', 'Blog', 'Contact'].map((l) => (
            <li key={l}><a href="#" style={{ color: 'rgba(255,255,255,.4)', textDecoration: 'none', fontSize: '.85rem', transition: 'color .2s' }}
              onMouseEnter={(e) => e.target.style.color = 'rgba(255,255,255,.8)'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,.4)'}
            >{l}</a></li>
          ))}
        </ul>
        <div style={{ fontSize: '.8rem' }}>© 2025 PitchSAP. All rights reserved.</div>
      </div>
    </footer>
  );
}
