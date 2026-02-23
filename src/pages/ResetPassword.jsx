import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width={20} height={20}>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

function getStrength(val) {
  let score = 0;
  if (val.length >= 8 && val.length <= 16) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/\d/.test(val)) score++;
  if (/[!@#$%^&*]/.test(val)) score++;
  if (score === 4) return { label: 'Strong password', cls: 'strong', color: '#2d6a4f' };
  if (score >= 2) return { label: 'Normal password', cls: 'normal', color: '#007bff' };
  return { label: 'Weak password', cls: 'weak', color: '#e63946' };
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = newPass ? getStrength(newPass) : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) { alert('Passwords do not match!'); return; }
    const allValid = newPass.length >= 8 && newPass.length <= 16 && /[A-Z]/.test(newPass) && /\d/.test(newPass) && /[!@#$%^&*]/.test(newPass);
    if (!allValid) { alert('Please create a strong password following all the rules!'); return; }
    alert('Password successfully reset!');
    navigate('/login');
  };

  const inputStyle = { width: '100%', padding: '10px 42px 10px 12px', border: '1px solid #bbb', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' };

  return (
    <div style={{
      margin: 0, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
      fontFamily: "'Segoe UI', sans-serif",
      background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat`,
      color: '#0d2a3a',
    }}>
      <style>{`@keyframes fadeIn { from {opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }`}</style>
      <div style={{ background: 'white', borderRadius: 16, padding: '40px 32px', width: 360, maxWidth: '90%', boxShadow: '0 8px 20px rgba(0,0,0,0.25)', textAlign: 'center', animation: 'fadeIn 0.8s ease-in-out', boxSizing: 'border-box' }}>
        <h2 style={{ marginBottom: 12 }}>Reset Password</h2>
        <p style={{ color: '#555', fontSize: 14, marginBottom: 18 }}>Set a strong new password for your account.</p>
        <form onSubmit={handleSubmit}>
          <div style={{ position: 'relative', marginBottom: newPass ? 10 : 16 }}>
            <input type={showNew ? 'text' : 'password'} placeholder="New Password" required value={newPass} onChange={e => setNewPass(e.target.value)} style={inputStyle} />
            <span onClick={() => setShowNew(!showNew)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#333', opacity: showNew ? 0.6 : 1 }}><EyeIcon /></span>
          </div>
          {strength && <div style={{ fontSize: 12, textAlign: 'left', fontWeight: 600, fontStyle: 'italic', paddingLeft: 4, marginBottom: 10, color: strength.color }}>{strength.label}</div>}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <input type={showConfirm ? 'text' : 'password'} placeholder="Confirm New Password" required value={confirmPass} onChange={e => setConfirmPass(e.target.value)} style={inputStyle} />
            <span onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#333', opacity: showConfirm ? 0.6 : 1 }}><EyeIcon /></span>
          </div>
          <div style={{ fontSize: 12, color: '#555', textAlign: 'left', marginTop: 6, opacity: 0.75, paddingLeft: 3, marginBottom: 10 }}>
            Your password must contain 8–16 characters, including at least one uppercase letter, one number, and one special character (!@#$%^&*).
          </div>
          <button type="submit" style={{ background: '#0d2a3a', color: 'white', border: 'none', width: '100%', padding: 10, borderRadius: 6, fontWeight: 600, cursor: 'pointer', marginTop: 12 }}>
            Reset Password
          </button>
        </form>
        <a href="/login" onClick={e => { e.preventDefault(); navigate('/login'); }} style={{ display: 'block', marginTop: 15, fontSize: 14, color: '#0d2a3a', textDecoration: 'none' }}>
          Back to Login
        </a>
      </div>
    </div>
  );
}
