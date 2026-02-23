import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdBalance } from 'react-icons/md';
import { FiEye, FiEyeOff, FiLock, FiUser, FiAlertCircle, FiLogIn } from 'react-icons/fi';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.password) { setError('Please enter username and password'); return; }
    setLoading(true);
    try {
      const res = await login(form.username, form.password);
      if (res.success) {
        navigate(res.user?.role === 'admin' ? '/admin' : from, { replace: true });
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const inputWrap = { position: 'relative', marginBottom: 16 };
  const inputStyle = {
    width: '100%', boxSizing: 'border-box', padding: '12px 14px 12px 42px',
    border: '2px solid #e0e0e0', borderRadius: 10, fontSize: 15,
    fontFamily: "'Segoe UI', sans-serif", transition: 'border-color 0.2s', background: '#fafafa',
  };
  const iconStyle = { position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' };

  return (
    <div style={{
      margin: 0, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
      fontFamily: "'Segoe UI', sans-serif",
      background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
        url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1920&auto=format&fit=crop') center/cover no-repeat fixed`,
      padding: '20px',
    }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .login-card { animation: fadeUp 0.45s ease; }
        .login-input:focus { outline: none; border-color: #0d2a3a !important; background: #fff !important; box-shadow: 0 0 0 3px rgba(13,42,58,0.1); }
        .login-btn:hover:not(:disabled) { background: #1a4763 !important; transform: translateY(-1px); }
        .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
      `}</style>

      <div className="login-card" style={{
        background: 'white', borderRadius: 20, boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
        padding: '44px 38px', width: '100%', maxWidth: 400, textAlign: 'center',
      }}>
        <div style={{ width: 56, height: 56, background: '#0d2a3a', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
          <MdBalance size={28} color="#c9a227" />
        </div>
        <h2 style={{ marginBottom: 5, fontSize: 24, color: '#0d2a3a', fontWeight: 800 }}>Welcome Back</h2>
        <p style={{ color: '#888', marginBottom: 28, fontSize: 14 }}>Login to access InCrime</p>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff3f3', border: '1px solid #ffcdd2', color: '#c62828', padding: '10px 14px', borderRadius: 8, marginBottom: 18, fontSize: 14, textAlign: 'left' }}>
            <FiAlertCircle size={16} style={{ flexShrink: 0 }} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={inputWrap}>
            <FiUser size={16} style={iconStyle} />
            <input
              className="login-input"
              type="text" placeholder="Username or Email" value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              style={inputStyle} autoComplete="username"
            />
          </div>
          <div style={{ ...inputWrap, marginBottom: 10 }}>
            <FiLock size={16} style={iconStyle} />
            <input
              className="login-input"
              type={showPass ? 'text' : 'password'} placeholder="Password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={{ ...inputStyle, paddingRight: 44 }} autoComplete="current-password"
            />
            <button type="button" onClick={() => setShowPass(!showPass)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#999', display: 'flex' }}>
              {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <div style={{ textAlign: 'right', marginBottom: 22 }}>
            <a href="/forgot-password" onClick={e => { e.preventDefault(); navigate('/forgot-password'); }}
              style={{ color: '#0d2a3a', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-btn" disabled={loading} style={{
            background: '#0d2a3a', color: 'white', border: 'none',
            padding: '13px', width: '100%', borderRadius: 10, fontWeight: 700,
            cursor: 'pointer', fontSize: 15, transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                Logging in...
              </span>
            ) : (
              <><FiLogIn size={16} /> Login</>
            )}
          </button>
        </form>

        <div style={{ marginTop: 22, borderTop: '1px solid #f0f0f0', paddingTop: 18, fontSize: 14, color: '#666' }}>
          Don't have an account?{' '}
          <a href="/signup" onClick={e => { e.preventDefault(); navigate('/signup'); }}
            style={{ color: '#0d2a3a', fontWeight: 700, textDecoration: 'none' }}>
            Create Account
          </a>
        </div>

        

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
