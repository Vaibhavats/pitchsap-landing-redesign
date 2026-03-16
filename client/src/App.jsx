import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import Chat from './components/Chat';

function AppInner() {
  const { user, loading } = useAuth();
  const [modal, setModal] = useState(null); // 'login' | 'signup' | null
  const [chatOpen, setChatOpen] = useState(false);

  // Don't render until auth state is restored from localStorage
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf9f6' }}>
        <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.5px' }}>
          Pitch<span style={{ color: '#ff4d1c' }}>SAP</span>
        </div>
      </div>
    );
  }

  const openLogin = () => setModal('login');
  const openSignup = () => setModal('signup');
  const closeModal = () => setModal(null);

  // Auto-open chat after login/signup
  const handleAuthSuccess = () => {
    closeModal();
    setTimeout(() => setChatOpen(true), 500);
  };

  return (
    <>
      <Navbar
        onOpenLogin={openLogin}
        onOpenSignup={openSignup}
        onOpenChat={() => setChatOpen((p) => !p)}
      />

      <Home onOpenSignup={openSignup} onOpenChat={() => setChatOpen(true)} />

      {/* Modals */}
      {modal === 'login' && (
        <LoginModal
          onClose={closeModal}
          onSwitchToSignup={() => setModal('signup')}
          onSuccess={handleAuthSuccess}
        />
      )}
      {modal === 'signup' && (
        <SignupModal
          onClose={closeModal}
          onSwitchToLogin={() => setModal('login')}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* Chat — only available when logged in */}
      {user && (
        <>
          <Chat isOpen={chatOpen} onClose={() => setChatOpen(false)} />

          {/* Chat toggle FAB */}
          {!chatOpen && (
            <button
              onClick={() => setChatOpen(true)}
              style={{
                position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 997,
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--accent)', border: 'none', cursor: 'pointer',
                color: '#fff', fontSize: '1.4rem',
                boxShadow: '0 8px 30px rgba(255,77,28,.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,77,28,.5)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,77,28,.4)'; }}
              title="Open AI Chat"
            >
              💬
              <span style={{ position: 'absolute', top: -2, right: -2, width: 14, height: 14, borderRadius: '50%', background: 'var(--green)', border: '2px solid var(--bg-card)' }} />
            </button>
          )}
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </BrowserRouter>
  );
}
