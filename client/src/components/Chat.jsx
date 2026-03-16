import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function Chat({ isOpen, onClose }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const messagesEndRef = useRef(null);

  const firstName = user?.name?.split(' ')[0] || 'there';

  // Load chat history from DB on first open
  useEffect(() => {
    if (isOpen && user && !historyLoaded) {
      loadHistory();
    }
  }, [isOpen, user]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const loadHistory = async () => {
    try {
      const { data } = await api.get('/chat/history');
      if (data.messages.length > 0) {
        const restored = data.messages.flatMap((m) => [
          { role: 'user', text: m.message, id: m._id + '_u' },
          { role: 'ai', text: m.reply, id: m._id + '_a' },
        ]);
        setMessages(restored);
      } else {
        // First time — show welcome
        setMessages([{
          role: 'ai',
          text: `Hey ${firstName}! 🎉 Ready to work on your startup idea? I'm your PitchSAP AI advisor. Tell me about your concept and I'll help you validate, refine, and pitch it.`,
          id: 'welcome',
        }]);
      }
    } catch {
      setMessages([{
        role: 'ai',
        text: `Hey ${firstName}! I'm your PitchSAP AI advisor. What startup idea are you working on?`,
        id: 'welcome',
      }]);
    }
    setHistoryLoaded(true);
  };

  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');

    setMessages((p) => [...p, { role: 'user', text: msg, id: Date.now() + '_u' }]);
    setLoading(true);

    try {
      const { data } = await api.post('/chat', { message: msg });
      setMessages((p) => [...p, { role: 'ai', text: data.reply, id: data.messageId + '_a' }]);
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Something went wrong. Please try again.';
      setMessages((p) => [...p, { role: 'ai', text: `⚠ ${errMsg}`, id: Date.now() + '_err' }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    'Help me validate my startup idea',
    'How do I find investors?',
    'What makes a great pitch deck?',
  ];

  const showSuggestions = messages.length <= 1 && !loading;

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 998,
      width: 380, maxHeight: 560,
      background: 'var(--bg-card)', borderRadius: 20,
      border: '1px solid var(--border)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      animation: 'chatIn .3s ease',
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem 1.25rem', background: 'var(--ink)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--accent)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '.9rem',
          }}>✦</div>
          <div>
            <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '.95rem' }}>PitchSAP AI</div>
            <div style={{ fontSize: '.75rem', opacity: .6, display: 'flex', alignItems: 'center', gap: '.35rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
              Online — Startup Advisor
            </div>
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'transparent', border: 'none',
          color: 'rgba(255,255,255,.6)', cursor: 'pointer', fontSize: '1.1rem', padding: 4,
        }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
        {messages.map((m, index) => (
            <ChatMessage
            key={m.id}
            message={m}
            user={user}
            isLast={index === messages.length - 1}
          />
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: '.6rem', maxWidth: '85%' }}>
            <Avatar role="ai" />
            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '2px 12px 12px 12px', padding: 0 }}>
              <div className="typing-dots"><span /><span /><span /></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', padding: '0 1.25rem .75rem', flexShrink: 0 }}>
          {suggestions.map((s) => (
            <button key={s} onClick={() => sendMessage(s)} style={{
              fontSize: '.75rem', padding: '.3rem .7rem', borderRadius: 100,
              border: '1px solid var(--border)', background: 'transparent',
              cursor: 'pointer', color: 'var(--ink-muted)', fontFamily: 'DM Sans', transition: 'all .2s',
            }}
              onMouseEnter={(e) => { e.target.style.background = 'var(--accent-soft)'; e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; }}
              onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--ink-muted)'; }}
            >{s}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ display: 'flex', gap: '.5rem', padding: '1rem 1.25rem', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder="Ask your startup advisor..."
          style={{
            flex: 1, padding: '.65rem .95rem',
            border: '1.5px solid var(--border)', borderRadius: 10,
            fontSize: '.88rem', background: 'var(--bg)', outline: 'none',
            fontFamily: 'DM Sans', transition: 'border-color .2s',
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          style={{
            width: 40, height: 40, borderRadius: 10,
            background: loading || !input.trim() ? '#ccc' : 'var(--accent)',
            border: 'none', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '1rem', transition: 'all .2s', flexShrink: 0,
          }}
        >↑</button>
      </div>
    </div>
  );
}

function ChatMessage({ message, user, isLast }) {
  const isUser = message.role === 'user';
  const [displayText, setDisplayText] = useState(
    isUser || !isLast ? message.text : ''
  );

  useEffect(() => {
    if (isUser || !isLast) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + message.text[i]);
      i++;

      if (i >= message.text.length) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [message.text, isLast]);

  return (
    <div
      style={{
        display: 'flex',
        gap: '.6rem',
        maxWidth: '85%',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        flexDirection: isUser ? 'row-reverse' : 'row'
      }}
    >
      <Avatar role={message.role} user={user} />

      <div
        style={{
          padding: '.65rem .95rem',
          borderRadius: isUser ? '12px 2px 12px 12px' : '2px 12px 12px 12px',
          fontSize: '.86rem',
          lineHeight: 1.55,
          background: isUser ? 'var(--accent)' : 'var(--bg)',
          color: isUser ? '#fff' : 'var(--ink)',
          border: isUser ? 'none' : '1px solid var(--border)',
          whiteSpace: 'pre-wrap'
        }}
      >
        {displayText}
      </div>
    </div>
  );
}
function Avatar({ role, user }) {
  const isAI = role === 'ai';
  const initials = isAI ? 'AI' : (user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U');
  return (
    <div style={{
      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
      background: isAI ? 'var(--ink)' : 'var(--accent)',
      color: '#fff', fontSize: '.7rem', fontWeight: 700,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{initials}</div>
  );
}
