import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const caseOptions = {
  criminal: [
    { name: 'Pre-Bail Application', value: 'pre', path: '/templates/criminal/bail-pre' },
    { name: 'Post-Bail Application', value: 'post', path: '/templates/criminal/bail-post' },
    { name: 'Theft Complaint', value: 'theft', path: '/templates/criminal/theft' },
    { name: 'Attendance Excused', value: 'attendance', path: '/templates/criminal/attendance-excused' },
    { name: 'Harassment Application', value: 'harassment', path: '/templates/criminal/harassment' },
    { name: 'Consent Application', value: 'consent', path: '/templates/criminal/consent' },
    { name: 'Challan Application', value: 'challan', path: '/templates/criminal/challan' },
  ],
  family: [
    { name: 'Nikah Nama Form', value: 'nikah', path: '/templates/family/nikah-nama' },
    { name: 'Child Custody', value: 'custody', path: '/templates/family/child-custody' },
    { name: 'Annulment of Marriage', value: 'annulment', path: '/templates/family/tansik-nikah' },
    { name: 'Second Marriage Permission', value: 'second-marriage', path: '/templates/family/second-marriage' },
    { name: 'Release from Dar-ul-Aman', value: 'release-darul-aman', path: '/templates/family/azad-darul-aman' },
    { name: 'Meeting at Dar-ul-Aman', value: 'meeting-darul-aman', path: '/templates/family/meeting-darul-aman' },
    { name: 'Sending to Dar-ul-Aman', value: 'sending-darul-aman', path: '/templates/family/sending-darul-aman' },
  ],
};

export default function Application() {
  const navigate = useNavigate();
  const [caseType, setCaseType] = useState('');
  const [subType, setSubType] = useState('');

  const handleContinue = () => {
    if (!caseType || !subType) { alert('Please select both case type and category'); return; }
    const selected = caseOptions[caseType].find(c => c.value === subType);
    if (selected) navigate(selected.path);
  };

  return (
    <div style={{
      minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", color: '#0d2a3a',
      display: 'flex', flexDirection: 'column',
      background: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1920&auto=format&fit=crop') center/cover no-repeat fixed`,
    }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.97)', borderRadius: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          padding: '50px 45px', width: '100%', maxWidth: 600,
        }}>
          <div style={{ textAlign: 'center', marginBottom: 35 }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>⚖️</div>
            <h1 style={{ fontSize: 28, color: '#0d2a3a', fontWeight: 800, marginBottom: 8 }}>Create Legal Application</h1>
            <p style={{ color: '#888', fontSize: 14 }}>Select your case type to generate a professional legal document</p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontWeight: 700, fontSize: 15, display: 'block', marginBottom: 8, color: '#0d2a3a' }}>
              📂 Case Type
            </label>
            <select
              value={caseType}
              onChange={e => { setCaseType(e.target.value); setSubType(''); }}
              style={{ padding: '14px 16px', border: '2px solid #e0e0e0', borderRadius: 10, width: '100%', fontSize: 15, cursor: 'pointer', background: '#fafafa', appearance: 'none', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor = '#0d2a3a'}
              onBlur={e => e.target.style.borderColor = '#e0e0e0'}
            >
              <option value="">— Select Case Type —</option>
              <option value="criminal">🔒 Criminal Cases</option>
              <option value="family">👨‍👩‍👧 Family Cases</option>
            </select>
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{ fontWeight: 700, fontSize: 15, display: 'block', marginBottom: 8, color: '#0d2a3a' }}>
              📋 Case Category
            </label>
            <select
              value={subType}
              onChange={e => setSubType(e.target.value)}
              disabled={!caseType}
              style={{ padding: '14px 16px', border: '2px solid #e0e0e0', borderRadius: 10, width: '100%', fontSize: 15, cursor: caseType ? 'pointer' : 'not-allowed', background: '#fafafa', opacity: caseType ? 1 : 0.5, outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor = '#0d2a3a'}
              onBlur={e => e.target.style.borderColor = '#e0e0e0'}
            >
              <option value="">— Select Case Category —</option>
              {caseType && caseOptions[caseType].map(opt => (
                <option key={opt.value} value={opt.value}>{opt.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleContinue}
            style={{
              width: '100%', padding: '16px', background: '#0d2a3a', color: 'white',
              border: 'none', borderRadius: 10, fontSize: 17, fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1a4763'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0d2a3a'; e.currentTarget.style.transform = 'none'; }}
          >
            Continue to Template →
          </button>

          <p style={{ textAlign: 'center', marginTop: 20, color: '#999', fontSize: 13 }}>
            All documents are in Urdu/Nastaliq format for Pakistani courts
          </p>
        </div>
      </div>

      <footer style={{ background: 'rgba(13,42,58,0.9)', color: '#fff', textAlign: 'center', padding: '15px', backdropFilter: 'blur(8px)' }}>
        © 2025 InCrime | Every Case, Every Detail
      </footer>
    </div>
  );
}
