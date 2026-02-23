import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import {
  FiSend, FiMic, FiMicOff, FiPlus, FiTrash2, FiMessageSquare,
  FiClock, FiChevronRight, FiX, FiMenu, FiMoon, FiSun, FiBookOpen
} from 'react-icons/fi';
import {
  MdBalance, MdGavel, MdFamilyRestroom, MdSecurity, MdHome
} from 'react-icons/md';
import { BsShieldLockFill, BsPeopleFill } from 'react-icons/bs';

const COLORS = { primary: '#0d2a3a', gold: '#c9a227', light: '#f4f6f9', white: '#ffffff' };

const QUICK_TOPICS = [
  { icon: MdBalance, label: 'Bail Application', q: 'How to file a bail application in Pakistan?' },
  { icon: MdGavel, label: 'File FIR', q: 'How to file an FIR at police station?' },
  { icon: MdFamilyRestroom, label: 'Divorce / Khula', q: 'How to get divorce or Khula in Pakistan?' },
  { icon: BsPeopleFill, label: 'Child Custody', q: 'How does child custody work in Pakistan?' },
  { icon: BsShieldLockFill, label: 'Harassment', q: 'What are my legal options against harassment?' },
  { icon: MdSecurity, label: 'Legal Rights', q: 'What are my fundamental rights if arrested?' },
  { icon: FiBookOpen, label: 'Cyber Crime', q: 'How to report cyber crime in Pakistan?' },
  { icon: MdHome, label: 'Dar-ul-Aman', q: 'What is Dar-ul-Aman and how to apply?' },
];

function formatMessage(text) {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (!line.trim()) return <div key={i} style={{ height: 6 }} />;
    if (line.match(/^[A-Z][A-Z\s\-\/]+:?\s*$/) || (line.endsWith(':') && line.length < 60 && !line.startsWith('-'))) {
      return <div key={i} style={{ fontWeight: 700, color: COLORS.primary, marginTop: 10, marginBottom: 2, fontSize: 13 }}>{line}</div>;
    }
    if (line.startsWith('- ')) {
      return (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 3, paddingLeft: 4 }}>
          <span style={{ color: COLORS.gold, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>•</span>
          <span style={{ fontSize: 14, lineHeight: 1.6 }}>{line.slice(2)}</span>
        </div>
      );
    }
    if (line.match(/^\d+\.\s/)) {
      const num = line.match(/^(\d+)\.\s/)[1];
      const rest = line.replace(/^\d+\.\s/, '');
      return (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 3, paddingLeft: 4 }}>
          <span style={{ color: COLORS.gold, fontWeight: 700, flexShrink: 0, minWidth: 18 }}>{num}.</span>
          <span style={{ fontSize: 14, lineHeight: 1.6 }}>{rest}</span>
        </div>
      );
    }
    return <div key={i} style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 2 }}>{line}</div>;
  });
}

export default function Chatbot() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState(() => {
    try { return JSON.parse(localStorage.getItem('incrime_chats')) || []; } catch { return []; }
  });
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef(null);
  const textareaRef = useRef(null);

  const bg = darkMode ? '#0f1115' : COLORS.light;
  const cardBg = darkMode ? '#1a1d24' : COLORS.white;
  const textColor = darkMode ? '#e5e7eb' : '#1a1a1a';
  const borderColor = darkMode ? '#2d3142' : '#e4e8ef';

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages, isTyping]);

  const saveSessions = (s) => { setSessions(s); localStorage.setItem('incrime_chats', JSON.stringify(s)); };

  const startNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setInputText('');
    setIsActive(false);
    setSuggestions([]);
    setSidebarOpen(false);
  };

  const loadSession = (id) => {
    const s = sessions.find(x => x.id === id);
    if (!s) return;
    setCurrentSessionId(id);
    setMessages(s.messages);
    setSuggestions(s.suggestions || []);
    setIsActive(true);
    setSidebarOpen(false);
  };

  const deleteSession = (id, e) => {
    e.stopPropagation();
    const ns = sessions.filter(s => s.id !== id);
    saveSessions(ns);
    if (currentSessionId === id) startNewChat();
  };

  const sendMessage = async (text) => {
    const msg = (text || inputText).trim();
    if (!msg || isTyping) return;

    setIsActive(true);
    const sessId = currentSessionId || Date.now();
    setCurrentSessionId(sessId);

    const userMsg = { role: 'user', text: msg, time: new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' }) };
    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    setInputText('');
    setSuggestions([]);
    setIsTyping(true);

    let updatedSessions = [...sessions];
    let session = updatedSessions.find(x => x.id === sessId);
    if (!session) {
      session = { id: sessId, title: msg.slice(0, 35) + (msg.length > 35 ? '...' : ''), messages: [] };
      updatedSessions = [session, ...updatedSessions];
    }
    session.messages = [...session.messages, userMsg];

    try {
      const { data } = await axios.post('/api/chatbot/message', { message: msg });
      const botMsg = { role: 'bot', text: data.response, time: new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' }) };
      const finalMsgs = [...updatedMsgs, botMsg];
      setMessages(finalMsgs);
      setSuggestions(data.suggestions || []);
      session.messages = [...session.messages, botMsg];
      session.suggestions = data.suggestions || [];
      saveSessions(updatedSessions.map(s => s.id === sessId ? session : s));
    } catch (err) {
      const errMsg = { role: 'bot', text: 'Sorry, I could not process your request. Please check your connection and try again.', time: '' };
      setMessages([...updatedMsgs, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert('Voice recognition is not supported in this browser');
    const recognition = new SR();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => { setInputText(e.results[0][0].transcript); recognition.stop(); };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: bg, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', color: textColor }}>
      <style>{`
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #c0c8d8; border-radius: 4px; }
        .chat-input:focus { outline: none; }
        .topic-btn:hover { background: #0d2a3a !important; color: #fff !important; }
        .sugg-btn:hover { background: #0d2a3a !important; color: #fff !important; border-color: #0d2a3a !important; }
        .send-btn:hover:not(:disabled) { background: #1a4763 !important; }
        .session-item:hover { background: rgba(13,42,58,0.06) !important; }
        @keyframes typingDot { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .msg-animate { animation: fadeIn 0.25s ease; }
      `}</style>

      <Navbar />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>

        {/* ── Sidebar ── */}
        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 998 }} />}
        <aside style={{
          position: 'fixed', left: 0, top: 0, height: '100vh', width: 270,
          background: COLORS.primary, color: '#fff', display: 'flex', flexDirection: 'column',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease', zIndex: 999, paddingTop: 64,
        }}>
          <div style={{ padding: '16px 16px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={startNewChat} style={{
              display: 'flex', alignItems: 'center', gap: 8, width: '100%',
              background: COLORS.gold, color: '#0d2a3a', border: 'none', padding: '10px 16px',
              borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14,
            }}>
              <FiPlus size={16} /> New Chat
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
            {sessions.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 30 }}>
                <FiMessageSquare size={28} style={{ marginBottom: 8, display: 'block', margin: '0 auto 8px' }} />
                No chat history yet
              </div>
            ) : sessions.map(s => (
              <div key={s.id} className="session-item" onClick={() => loadSession(s.id)} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '10px 10px',
                borderRadius: 8, cursor: 'pointer', marginBottom: 2,
                background: currentSessionId === s.id ? 'rgba(255,255,255,0.12)' : 'transparent',
                transition: 'background 0.15s',
              }}>
                <FiMessageSquare size={14} style={{ flexShrink: 0, opacity: 0.7 }} />
                <span style={{ flex: 1, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', opacity: 0.9 }}>{s.title}</span>
                <button onClick={(e) => deleteSession(s.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 2, flexShrink: 0 }}>
                  <FiTrash2 size={13} />
                </button>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 8 }}>
            <button onClick={() => setDarkMode(!darkMode)} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '8px', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13 }}>
              {darkMode ? <FiSun size={14} /> : <FiMoon size={14} />}
              {darkMode ? 'Light' : 'Dark'}
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: bg }}>

          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: cardBg, borderBottom: `1px solid ${borderColor}`, flexShrink: 0 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.primary, display: 'flex', alignItems: 'center', padding: 4 }}>
              <FiMenu size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MdBalance size={20} color={COLORS.gold} />
              <span style={{ fontWeight: 700, fontSize: 15, color: COLORS.primary }}>InCrime Legal AI</span>
              <span style={{ background: '#e8f5e9', color: '#2e7d32', fontSize: 11, padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>Online</span>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              {isActive && (
                <button onClick={startNewChat} style={{ background: 'none', border: `1px solid ${borderColor}`, color: COLORS.primary, padding: '5px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <FiPlus size={13} /> New Chat
                </button>
              )}
            </div>
          </div>

          {/* ── Welcome Screen ── */}
          {!isActive && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '30px 20px' }}>
              <div style={{ maxWidth: 700, margin: '0 auto' }}>
                {/* Hero */}
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                  <div style={{ width: 64, height: 64, background: COLORS.primary, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <MdBalance size={32} color={COLORS.gold} />
                  </div>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: COLORS.primary, marginBottom: 8 }}>InCrime Legal AI Assistant</h2>
                  <p style={{ color: '#667085', fontSize: 15, lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
                    Ask me anything about Pakistani law. I provide guidance on criminal cases, family law, legal rights, and document generation.
                  </p>
                </div>

                {/* Quick topic buttons */}
                <div style={{ marginBottom: 32 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#667085', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Topics</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
                    {QUICK_TOPICS.map(({ icon: Icon, label, q }) => (
                      <button key={label} className="topic-btn" onClick={() => sendMessage(q)} style={{
                        display: 'flex', alignItems: 'center', gap: 9, padding: '12px 14px',
                        background: cardBg, border: `1.5px solid ${borderColor}`, borderRadius: 10,
                        cursor: 'pointer', color: textColor, fontSize: 13, fontWeight: 500,
                        transition: 'all 0.2s', textAlign: 'left',
                      }}>
                        <Icon size={16} color={COLORS.gold} style={{ flexShrink: 0 }} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Example questions */}
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#667085', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Example Questions</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      'What should I do if police refuse to register my FIR?',
                      'What is the difference between pre-arrest and post-arrest bail?',
                      'How can a wife get Khula if husband refuses divorce?',
                      'What are my fundamental rights if I am arrested in Pakistan?',
                      'How do I report someone who is blackmailing me online?',
                    ].map(q => (
                      <button key={q} onClick={() => sendMessage(q)} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '12px 16px', background: cardBg, border: `1px solid ${borderColor}`,
                        borderRadius: 10, cursor: 'pointer', color: textColor, fontSize: 14,
                        textAlign: 'left', transition: 'all 0.2s',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.primary; e.currentTarget.style.background = darkMode ? '#1e2130' : '#f0f3f8'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.background = cardBg; }}
                      >
                        <span>{q}</span>
                        <FiChevronRight size={15} color="#999" style={{ flexShrink: 0, marginLeft: 8 }} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Chat Messages ── */}
          {isActive && (
            <div ref={chatBoxRef} style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', background: darkMode ? '#13161d' : '#f4f6f9' }}>
              <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {messages.map((msg, i) => (
                  <div key={i} className="msg-animate" style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    {msg.role === 'bot' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                        <div style={{ width: 26, height: 26, background: COLORS.primary, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <MdBalance size={14} color={COLORS.gold} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary }}>InCrime AI</span>
                      </div>
                    )}
                    <div style={{
                      maxWidth: '82%', padding: '12px 16px',
                      borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                      background: msg.role === 'user' ? COLORS.primary : cardBg,
                      color: msg.role === 'user' ? '#fff' : textColor,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                      border: msg.role === 'bot' ? `1px solid ${borderColor}` : 'none',
                    }}>
                      {msg.role === 'bot' ? formatMessage(msg.text) : <span style={{ fontSize: 14, lineHeight: 1.6 }}>{msg.text}</span>}
                    </div>
                    {msg.time && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3, color: '#aaa', fontSize: 11 }}>
                        <FiClock size={10} /> {msg.time}
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="msg-animate" style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ width: 26, height: 26, background: COLORS.primary, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MdBalance size={14} color={COLORS.gold} />
                    </div>
                    <div style={{ background: cardBg, border: `1px solid ${borderColor}`, padding: '12px 16px', borderRadius: '4px 16px 16px 16px', display: 'flex', gap: 5, alignItems: 'center' }}>
                      {[0, 1, 2].map(d => (
                        <span key={d} style={{ width: 7, height: 7, background: COLORS.gold, borderRadius: '50%', display: 'inline-block', animation: `typingDot 1.2s ${d * 0.2}s infinite` }} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Follow-up suggestions */}
                {suggestions.length > 0 && !isTyping && (
                  <div className="msg-animate" style={{ paddingLeft: 34 }}>
                    <p style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 500 }}>Suggested follow-up questions:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {suggestions.map((s, i) => (
                        <button key={i} className="sugg-btn" onClick={() => sendMessage(s)} style={{
                          background: cardBg, border: `1.5px solid ${borderColor}`, color: COLORS.primary,
                          padding: '7px 13px', borderRadius: 20, cursor: 'pointer', fontSize: 13,
                          transition: 'all 0.2s', fontWeight: 500,
                        }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Input Box ── */}
          <div style={{ padding: '12px 16px 14px', background: cardBg, borderTop: `1px solid ${borderColor}`, flexShrink: 0 }}>
            <div style={{ maxWidth: 780, margin: '0 auto' }}>
              <div style={{
                display: 'flex', alignItems: 'flex-end', gap: 10,
                background: darkMode ? '#1e2130' : '#f4f6f9', border: `2px solid ${isTyping ? borderColor : COLORS.primary + '40'}`,
                borderRadius: 14, padding: '8px 10px', transition: 'border-color 0.2s',
              }}>
                <textarea
                  ref={textareaRef}
                  className="chat-input"
                  value={inputText}
                  onChange={e => { setInputText(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'; }}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Ask a legal question in English or Urdu..."
                  style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 14, padding: '4px 6px', resize: 'none', maxHeight: 120, color: textColor, fontFamily: 'inherit', lineHeight: 1.6 }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, paddingBottom: 2 }}>
                  <button onClick={handleVoice} style={{ background: isListening ? '#fee2e2' : 'none', border: 'none', cursor: 'pointer', color: isListening ? '#dc2626' : '#888', padding: 6, borderRadius: 8, display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}>
                    {isListening ? <FiMicOff size={17} /> : <FiMic size={17} />}
                  </button>
                  <button
                    className="send-btn"
                    onClick={() => sendMessage()}
                    disabled={!inputText.trim() || isTyping}
                    style={{
                      background: inputText.trim() && !isTyping ? COLORS.primary : '#d1d5db',
                      color: '#fff', width: 36, height: 36, borderRadius: 10, border: 'none',
                      cursor: inputText.trim() && !isTyping ? 'pointer' : 'not-allowed',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                    }}
                  >
                    <FiSend size={15} />
                  </button>
                </div>
              </div>
              <p style={{ textAlign: 'center', fontSize: 11, color: '#aaa', margin: '7px 0 0' }}>
                InCrime provides general legal information only. Consult a licensed advocate for professional advice.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
