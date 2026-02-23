import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  const teamMembers = [
    { name: 'Ikram Khan', role: 'Founder & Lead Developer', icon: '👨‍💻', desc: 'Full-stack developer specializing in legal tech solutions for Pakistan.' },
    { name: 'Legal Advisory Team', role: 'Legal Consultants', icon: '⚖️', desc: 'Experienced lawyers and advocates ensuring accuracy of all templates.' },
    { name: 'AI Research Team', role: 'AI & ML Engineers', icon: '🤖', desc: 'Building intelligent systems to assist in legal document generation.' },
  ];

  const values = [
    { icon: '🎯', title: 'Accuracy', desc: 'All templates reviewed by certified advocates to ensure legal compliance.' },
    { icon: '🔒', title: 'Privacy', desc: 'Your data is encrypted and never shared with third parties.' },
    { icon: '⚡', title: 'Efficiency', desc: 'Generate documents in minutes instead of hours spent at legal offices.' },
    { icon: '🌍', title: 'Accessibility', desc: 'Making legal assistance available to everyone in Pakistan, regardless of location.' },
    { icon: '🗣️', title: 'Urdu First', desc: 'All documents in Urdu/Nastaliq for Pakistani courts and legal proceedings.' },
    { icon: '💡', title: 'Innovation', desc: 'Continuously improving with AI and community feedback.' },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#fff', minHeight: '100vh' }}>
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .about-animate { animation: fadeIn 0.6s ease both; }
        @media(max-width:768px) {
          .about-hero { padding: 60px 20px !important; }
          .team-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: repeat(2,1fr) !important; }
          .mission-section { flex-direction: column !important; }
        }
      `}</style>

      <Navbar />

      {/* Hero */}
      <div className="about-hero" style={{
        padding: '100px 60px', textAlign: 'center', color: 'white',
        background: `linear-gradient(rgba(13,42,58,0.9), rgba(13,42,58,0.9)),
          url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1920&auto=format&fit=crop') center/cover no-repeat`,
      }}>
        <div className="about-animate">
          <div style={{ fontSize: 64, marginBottom: 20 }}>⚖️</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 15 }}>About InCrime</h1>
          <p style={{ fontSize: 18, maxWidth: 600, margin: '0 auto', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
            Empowering Pakistani citizens with accessible, accurate, and instant legal document generation.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section style={{ padding: '80px 60px', background: '#f8f9fa' }}>
        <div className="mission-section" style={{ display: 'flex', gap: 50, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: '#FFD700', color: '#0d2a3a', display: 'inline-block', padding: '5px 15px', borderRadius: 20, fontSize: 13, fontWeight: 700, marginBottom: 15 }}>
              Our Mission
            </div>
            <h2 style={{ fontSize: 38, color: '#0d2a3a', fontWeight: 800, marginBottom: 20, lineHeight: 1.2 }}>
              Democratizing Legal Access in Pakistan
            </h2>
            <p style={{ color: '#555', fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              InCrime was built to bridge the gap between Pakistani citizens and the legal system. We believe that everyone deserves access to proper legal documentation, regardless of their financial status or location.
            </p>
            <p style={{ color: '#555', fontSize: 16, lineHeight: 1.8 }}>
              Our platform provides AI-powered legal document templates for criminal and family cases, reviewed by qualified advocates to ensure they meet Pakistani court standards.
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              background: 'linear-gradient(135deg, #0d2a3a, #1a4763)',
              borderRadius: 20, padding: '40px', color: 'white', textAlign: 'center',
            }}>
              <div style={{ fontSize: 60, marginBottom: 20 }}>🏛️</div>
              <h3 style={{ fontSize: 24, color: '#FFD700', marginBottom: 15 }}>Legal Documentation Made Simple</h3>
              <p style={{ opacity: 0.9, lineHeight: 1.7 }}>
                From bail applications to nikah nama, we provide professionally structured Urdu legal documents for Pakistani courts.
              </p>
              <button onClick={() => navigate('/signup')} style={{
                marginTop: 20, background: '#FFD700', color: '#0d2a3a', border: 'none',
                padding: '12px 28px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 15,
              }}>
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 60px', background: '#fff' }}>
        <h2 style={{ textAlign: 'center', fontSize: 38, color: '#0d2a3a', fontWeight: 800, marginBottom: 10 }}>Our Values</h2>
        <div style={{ width: 80, height: 4, background: '#FFD700', margin: '0 auto 50px', borderRadius: 2 }} />
        <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 25, maxWidth: 1100, margin: '0 auto' }}>
          {values.map(v => (
            <div key={v.title} style={{
              background: '#f8f9fa', borderRadius: 16, padding: '30px 25px', textAlign: 'center',
              transition: 'all 0.3s', cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0d2a3a'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f8f9fa'; e.currentTarget.style.color = 'inherit'; }}
            >
              <div style={{ fontSize: 44, marginBottom: 15 }}>{v.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{v.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'inherit', opacity: 0.8 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 60px', background: '#0d2a3a' }}>
        <h2 style={{ textAlign: 'center', fontSize: 38, color: '#FFD700', fontWeight: 800, marginBottom: 10 }}>Our Team</h2>
        <div style={{ width: 80, height: 4, background: '#FFD700', margin: '0 auto 50px', borderRadius: 2 }} />
        <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 25, maxWidth: 900, margin: '0 auto' }}>
          {teamMembers.map(m => (
            <div key={m.name} style={{
              background: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: '35px 25px',
              textAlign: 'center', border: '1px solid rgba(255,215,0,0.2)',
            }}>
              <div style={{ fontSize: 50, marginBottom: 15 }}>{m.icon}</div>
              <h3 style={{ color: '#FFD700', fontSize: 18, fontWeight: 700, marginBottom: 5 }}>{m.name}</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{m.role}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 60px', background: '#FFD700', textAlign: 'center' }}>
        <h2 style={{ fontSize: 38, color: '#0d2a3a', fontWeight: 800, marginBottom: 15 }}>Ready to Generate Your Legal Document?</h2>
        <p style={{ color: '#0d2a3a', fontSize: 16, marginBottom: 30 }}>Join thousands of Pakistanis who have used InCrime for their legal documentation needs.</p>
        <div style={{ display: 'flex', gap: 15, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/signup')} style={{
            background: '#0d2a3a', color: '#FFD700', border: 'none', padding: '14px 32px',
            borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer',
          }}>
            Create Free Account
          </button>
          <button onClick={() => navigate('/how-it-works')} style={{
            background: 'transparent', color: '#0d2a3a', border: '2px solid #0d2a3a', padding: '14px 32px',
            borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer',
          }}>
            How It Works
          </button>
        </div>
      </section>

      <footer style={{ background: '#0b2331', color: '#fff', textAlign: 'center', padding: '20px' }}>
        <p style={{ margin: 0, fontSize: 14 }}>© 2025 InCrime | Every Case, Every Detail</p>
      </footer>
    </div>
  );
}
