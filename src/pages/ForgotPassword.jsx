import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/forgot-password', { email });
      setSuccess(data.message || 'Reset link sent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending reset email.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', boxSizing: 'border-box', padding: '11px 14px', border: '2px solid #e0e0e0', borderRadius: 8, fontSize: 15, fontFamily: "'Segoe UI', sans-serif" };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Segoe UI', sans-serif", background: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1920&auto=format&fit=crop') center/cover no-repeat fixed`, padding: 20 }}>
      <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', padding: '45px 40px', width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <div style={{ fontSize: 42, marginBottom: 8 }}>🔑</div>
        <h2 style={{ fontSize: 24, color: '#0d2a3a', marginBottom: 5 }}>Forgot Password</h2>
        <p style={{ color: '#888', fontSize: 14, marginBottom: 25 }}>Enter your email to receive a reset link</p>
        {error && <div style={{ background: '#fff3f3', border: '1px solid #ffcdd2', color: '#c62828', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>❌ {error}</div>}
        {success && <div style={{ background: '#f0fff4', border: '1px solid #a3e4b7', color: '#1a7a3a', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>✅ {success}</div>}
        {!success && (
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="📧 Your Email Address" value={email} onChange={e => setEmail(e.target.value)} required style={{ ...inputStyle, marginBottom: 20 }} />
            <button type="submit" disabled={loading} style={{ background: loading ? '#999' : '#0d2a3a', color: 'white', border: 'none', padding: 13, width: '100%', borderRadius: 8, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontSize: 16 }}>
              {loading ? '⏳ Sending...' : '📨 Send Reset Link'}
            </button>
          </form>
        )}
        <div style={{ marginTop: 20, fontSize: 14 }}>
          <a href="/login" onClick={e => { e.preventDefault(); navigate('/login'); }} style={{ color: '#0d2a3a', fontWeight: 700, textDecoration: 'none' }}>← Back to Login</a>
        </div>
      </div>
    </div>
  );
}
