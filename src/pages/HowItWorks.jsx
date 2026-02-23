import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function HowItWorks() {
  const navigate = useNavigate();
  const [hovered, setHovered] = React.useState(null);

  const links = [
    { label: 'Home', to: '/' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'Create Application', to: '/application' },
    { label: 'About', to: '/#about' },
    { label: 'Contact', to: '/#contact' },
  ];

  const options = [
    { key: 'chatbot', title: '💬 Chatbot Help Working', desc: 'Learn how our chatbot guides you step-by-step to create legal applications.', path: '/chatbot-demo' },
    { key: 'generate', title: '📝 Generate Application Working', desc: 'See how InCrime instantly generates professional legal documents using AI.', path: '/generate-demo' },
  ];

  return (
    <div style={{ margin: 0, fontFamily: "'Segoe UI', sans-serif", background: 'linear-gradient(135deg, #e9f0f5, #fdfdfd)', color: '#0d2a3a' }}>
      <Navbar links={links} />

      <div style={{ textAlign: 'center', padding: '80px 10%', minHeight: '100vh' }}>
        <h1>How It Works</h1>
        <p>Understand how InCrime automates legal help through Chatbot and Application Generation features.</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60, flexWrap: 'wrap', marginTop: 60 }}>
          {options.map(opt => (
            <div
              key={opt.key}
              onClick={() => navigate(opt.path)}
              style={{
                background: '#fff', borderRadius: 18, boxShadow: hovered === opt.key ? '0 15px 35px rgba(0,0,0,0.15)' : '0 10px 30px rgba(0,0,0,0.1)',
                padding: 40, width: 300, textAlign: 'center', cursor: 'pointer',
                transform: hovered === opt.key ? 'translateY(-8px)' : 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={() => setHovered(opt.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <h2 style={{ fontSize: 22, color: '#0d2a3a', marginBottom: 15 }}>{opt.title}</h2>
              <p style={{ fontSize: 16, color: '#333' }}>{opt.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ background: '#0d2a3a', color: '#fff', textAlign: 'center', padding: 15, marginTop: 60 }}>
        © 2025 InCrime | Empowering Legal Access for Everyone
      </footer>
    </div>
  );
}
