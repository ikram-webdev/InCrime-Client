import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const criminalCases = [
  { key: 'bail-pre', title: 'Pre-Bail Application', desc: 'Request to prevent arrest before trial', path: '/templates/criminal/bail-pre', icon: '⚖️' },
  { key: 'bail-post', title: 'Post-Bail Application', desc: 'Request for release or modify bail after granted', path: '/templates/criminal/bail-post', icon: '🔓' },
  { key: 'theft', title: 'Theft Complaint', desc: 'Reporting theft or robbery incidents', path: '/templates/criminal/theft', icon: '🔒' },
  { key: 'attendance', title: 'Attendance Excused', desc: 'Cases where court attendance is excused', path: '/templates/criminal/attendance-excused', icon: '📋' },
  { key: 'harassment', title: 'Harassment', desc: 'Legal protection against harassment and abuse', path: '/templates/criminal/harassment', icon: '🛡️' },
  { key: 'consent', title: 'Consent Application', desc: 'Cases related to mutual agreement issues', path: '/templates/criminal/consent', icon: '🤝' },
  { key: 'challan', title: 'Challan Application', desc: 'Court petition for challan related matters', path: '/templates/criminal/challan', icon: '📄' },
];

const familyCases = [
  { key: 'nikah', title: 'Nikah Nama Form', desc: 'Register or correct marriage legal records', path: '/templates/family/nikah-nama', icon: '💍' },
  { key: 'custody', title: 'Child Custody', desc: 'Guardianship and custody applications', path: '/templates/family/child-custody', icon: '👶' },
  { key: 'tansik', title: 'Annulment of Marriage', desc: 'Request to declare marriage null and void', path: '/templates/family/tansik-nikah', icon: '📜' },
  { key: 'second', title: 'Second Marriage', desc: 'Court permission for second marriage', path: '/templates/family/second-marriage', icon: '💑' },
  { key: 'azad', title: 'Release from Darul-Aman', desc: 'Application for release from Dar-ul-Aman', path: '/templates/family/azad-darul-aman', icon: '🏠' },
  { key: 'meeting', title: 'Meeting at Dar-ul-Aman', desc: 'Permission to meet someone in Dar-ul-Aman', path: '/templates/family/meeting-darul-aman', icon: '🤲' },
  { key: 'sending', title: 'Sending to Dar-ul-Aman', desc: 'Application to send woman to Dar-ul-Aman', path: '/templates/family/sending-darul-aman', icon: '🏛️' },
];

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activePage, setActivePage] = useState('home');
  const [showTop, setShowTop] = useState(false);
  const [cardHover, setCardHover] = useState(null);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTemplateClick = (path) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: path } });
      return;
    }
    navigate(path);
  };

  const SubcategoryGrid = ({ cases }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginTop: 20, marginBottom: 40 }}>
      {cases.map(c => (
        <div key={c.key} onClick={() => handleTemplateClick(c.path)}
          style={{
            background: 'white', borderRadius: 12, padding: '24px 20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.07)', borderLeft: '5px solid #FFD700',
            cursor: 'pointer', transition: 'all 0.3s', textAlign: 'center',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.07)'; }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>{c.icon}</div>
          <h4 style={{ color: '#0d2a3a', marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{c.title}</h4>
          <p style={{ color: '#666', fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>{c.desc}</p>
          <button style={{
            background: '#FFD700', color: '#0d2a3a', border: 'none', padding: '8px 20px',
            borderRadius: 20, fontWeight: 700, cursor: 'pointer', fontSize: 13,
          }}>
            Generate →
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ margin: 0, fontFamily: "'Segoe UI', sans-serif", color: '#0d2a3a', background: '#fff' }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .hero-animate { animation: fadeIn 0.8s ease both; }
        .stat-box { text-align: center; padding: 20px; }
        .stat-number { font-size: 42px; font-weight: 800; color: #FFD700; }
        .stat-label { font-size: 14px; color: rgba(255,255,255,0.8); margin-top: 4px; }
        @media(max-width: 768px) {
          .hero-content { flex-direction: column !important; padding: 0 20px !important; }
          .categories-cards { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .hero-h1 { font-size: 28px !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .sub-grid { padding: 20px !important; }
        }
      `}</style>

      <Navbar />

      {/* HOME PAGE */}
      {activePage === 'home' && (
        <>
          {/* HERO */}
          <div style={{
            minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', position: 'relative', padding: '60px 80px',
            background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
              url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1920&auto=format&fit=crop') center/cover no-repeat fixed`,
          }}>
            <div className="hero-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: 1200, gap: 40 }}>
              <div className="hero-animate" style={{ flex: 1 }}>
                <div style={{ background: '#FFD700', color: '#0d2a3a', display: 'inline-block', padding: '5px 15px', borderRadius: 20, fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                  🇵🇰 Pakistan's #1 Legal Document Platform
                </div>
                <h1 className="hero-h1" style={{ fontSize: 48, marginBottom: 20, lineHeight: 1.2, fontWeight: 800 }}>
                  Automated Legal Document Generation & Case Assistance
                </h1>
                <p style={{ fontSize: 18, maxWidth: 550, color: '#f2f2f2', lineHeight: 1.7, marginBottom: 30 }}>
                  Generate court applications, FIRs, and legal documents instantly. Get guided assistance through an integrated chatbot for your legal queries.
                </p>
                <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => isAuthenticated ? setActivePage('criminal') : navigate('/login')}
                    style={{ background: '#FFD700', color: '#0d2a3a', border: 'none', padding: '14px 30px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                  >
                    ⚖️ Get Started
                  </button>
                  <button
                    onClick={() => navigate('/chatbot')}
                    style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '2px solid rgba(255,255,255,0.4)', padding: '14px 30px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer', backdropFilter: 'blur(8px)' }}
                  >
                    💬 AI Chatbot
                  </button>
                </div>
              </div>

              <div className="hero-animate" style={{
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255,255,255,0.25)', borderRadius: 20,
                padding: '35px 30px', textAlign: 'center', maxWidth: 320, flexShrink: 0,
                cursor: 'pointer', transition: 'all 0.3s',
              }}
                onClick={() => isAuthenticated ? navigate('/application') : navigate('/login')}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,215,0,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: 56, marginBottom: 15 }}>⚖️</div>
                <h3 style={{ fontSize: 20, color: '#FFD700', marginBottom: 10 }}>Generate Your Application</h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.6 }}>Quickly draft and download legal applications using AI assistance</p>
                <div style={{ marginTop: 15, background: '#FFD700', color: '#0d2a3a', padding: '8px 20px', borderRadius: 20, fontWeight: 700, fontSize: 13, display: 'inline-block' }}>
                  Start Now →
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div style={{ background: '#0d2a3a', padding: '40px 60px' }}>
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: 1000, margin: '0 auto', gap: 20 }}>
              {[
                { n: '10,000+', l: 'Documents Generated' },
                { n: '14', l: 'Legal Templates' },
                { n: '2', l: 'Case Categories' },
                { n: '24/7', l: 'AI Chatbot Support' },
              ].map((s, i) => (
                <div key={i} className="stat-box">
                  <div className="stat-number">{s.n}</div>
                  <div className="stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CATEGORIES */}
          <section style={{ padding: '80px 60px', background: '#f8f9fa' }} id="categories">
            <h2 style={{ textAlign: 'center', marginBottom: 10, fontSize: 38, color: '#0d2a3a', fontWeight: 800 }}>
              Case Categories
            </h2>
            <div style={{ width: 80, height: 4, background: '#FFD700', margin: '0 auto 50px', borderRadius: 2 }} />
            <div className="categories-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 30, maxWidth: 1000, margin: '0 auto' }}>
              {[
                { key: 'criminal', title: '🔒 Criminal Cases', desc: 'Cases related to theft, assault, bail applications, and other criminal offences. Legal guidance and FIR drafting support available.', color: '#dc3545', count: '7 Templates' },
                { key: 'family', title: '👨‍👩‍👧 Family Cases', desc: 'Divorce, custody, Nikah Nama, and domestic issues handled with privacy and accuracy through our AI-powered forms.', color: '#28a745', count: '7 Templates' },
              ].map(cat => (
                <div key={cat.key}
                  style={{
                    background: 'white', borderRadius: 16, padding: '45px 40px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.07)', cursor: 'pointer',
                    border: `2px solid ${cardHover === cat.key ? '#FFD700' : 'transparent'}`,
                    transition: 'all 0.3s',
                    transform: cardHover === cat.key ? 'translateY(-5px)' : 'none',
                  }}
                  onClick={() => { setActivePage(cat.key); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  onMouseEnter={() => setCardHover(cat.key)}
                  onMouseLeave={() => setCardHover(null)}
                >
                  <div style={{ background: cat.color, color: 'white', display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 15 }}>
                    {cat.count}
                  </div>
                  <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 15, color: '#0d2a3a' }}>{cat.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: '#555' }}>{cat.desc}</p>
                  <div style={{ marginTop: 20, color: '#0d2a3a', fontWeight: 700, fontSize: 14 }}>
                    View Templates →
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section style={{ padding: '80px 60px', background: '#fff' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 10, fontSize: 38, color: '#0d2a3a', fontWeight: 800 }}>How It Works</h2>
            <div style={{ width: 80, height: 4, background: '#FFD700', margin: '0 auto 50px', borderRadius: 2 }} />
            <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30, maxWidth: 1100, margin: '0 auto' }}>
              {[
                { step: '01', title: 'Choose Template', desc: 'Select from our library of legal document templates for criminal or family cases.', icon: '📂' },
                { step: '02', title: 'Fill in Details', desc: 'Enter your case details in the guided form. All fields are clearly labeled in Urdu.', icon: '✏️' },
                { step: '03', title: 'Download Document', desc: 'Preview your legal document and download or print it instantly in ready-to-submit format.', icon: '📥' },
              ].map(item => (
                <div key={item.step} style={{ textAlign: 'center', padding: '35px 25px', background: '#f8f9fa', borderRadius: 16 }}>
                  <div style={{ fontSize: 50, marginBottom: 15 }}>{item.icon}</div>
                  <div style={{ background: '#FFD700', color: '#0d2a3a', width: 36, height: 36, borderRadius: '50%', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                    {item.step}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, color: '#0d2a3a' }}>{item.title}</h3>
                  <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section style={{ padding: '80px 60px', background: '#0d2a3a', color: '#fff' }} id="contact">
            <div style={{ maxWidth: 700 }}>
              <h2 style={{ fontSize: 38, marginBottom: 30, color: '#FFD700', fontWeight: 800 }}>Contact Us</h2>
              <div style={{ display: 'grid', gap: 15 }}>
                {[
                  ['📧', 'Email', 'support@incrime.pk'],
                  ['📞', 'Phone', '+92 300 1234567'],
                  ['💬', 'WhatsApp', '+92 300 1234567'],
                  ['📍', 'Address', 'Model Town, Lahore, Pakistan'],
                ].map(([icon, label, val]) => (
                  <p key={label} style={{ fontSize: 17, margin: 0, display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 22 }}>{icon}</span>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{label}:</span>
                    <span style={{ color: '#FFD700', fontWeight: 600 }}>{val}</span>
                  </p>
                ))}
              </div>
            </div>
          </section>

          <footer style={{ background: '#0b2331', color: '#fff', textAlign: 'center', padding: '20px 20px' }}>
            <p style={{ margin: '0 0 8px', fontSize: 14, color: '#aaa' }}>
              ⚠️ Disclaimer: InCrime is not affiliated with any government or legal authority. It only provides AI-based assistance for educational and informational purposes.
            </p>
            <p style={{ margin: 0, fontSize: 14 }}>© 2025 InCrime | Every Case, Every Detail</p>
          </footer>
        </>
      )}

      {/* CRIMINAL CASES */}
      {activePage === 'criminal' && (
        <div className="sub-grid" style={{ padding: '40px 60px', minHeight: '80vh', background: '#f8f9fa' }}>
          <div style={{ background: 'linear-gradient(135deg, #0d2a3a 0%, #1a4763 100%)', color: 'white', padding: '30px 40px', borderRadius: 16, marginBottom: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 15 }}>
              <div>
                <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800 }}>🔒 Criminal Cases</h1>
                <p style={{ margin: '8px 0 0', opacity: 0.85 }}>Select a criminal case type to generate your legal application</p>
              </div>
              <button onClick={() => setActivePage('home')} style={{ background: '#FFD700', color: '#0d2a3a', border: 'none', padding: '10px 22px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
                ← Back
              </button>
            </div>
          </div>
          <SubcategoryGrid cases={criminalCases} />
        </div>
      )}

      {/* FAMILY CASES */}
      {activePage === 'family' && (
        <div className="sub-grid" style={{ padding: '40px 60px', minHeight: '80vh', background: '#f8f9fa' }}>
          <div style={{ background: 'linear-gradient(135deg, #0d2a3a 0%, #1a4763 100%)', color: 'white', padding: '30px 40px', borderRadius: 16, marginBottom: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 15 }}>
              <div>
                <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800 }}>👨‍👩‍👧 Family Cases</h1>
                <p style={{ margin: '8px 0 0', opacity: 0.85 }}>Select a family case type to generate your legal application</p>
              </div>
              <button onClick={() => setActivePage('home')} style={{ background: '#FFD700', color: '#0d2a3a', border: 'none', padding: '10px 22px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
                ← Back
              </button>
            </div>
          </div>
          <SubcategoryGrid cases={familyCases} />
        </div>
      )}

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed', bottom: 30, right: 30, background: '#FFD700', color: '#0d2a3a',
            border: 'none', width: 48, height: 48, borderRadius: '50%', fontSize: 18,
            fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            zIndex: 999,
          }}
        >↑</button>
      )}
    </div>
  );
}
