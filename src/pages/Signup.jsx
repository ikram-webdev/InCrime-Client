import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdBalance } from 'react-icons/md';
import { FiEye, FiEyeOff, FiLock, FiUser, FiMail, FiPhone, FiAlertCircle, FiUserPlus } from 'react-icons/fi';

// 1. Password Strength Logic
function getStrength(val) {
  let score = 0;
  if (val.length >= 8 && val.length <= 16) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/\d/.test(val)) score++;
  if (/[!@#$%^&*]/.test(val)) score++;
  if (score <= 2) return { label: 'Weak password', color: '#e53935', width: '30%' };
  if (score === 3) return { label: 'Medium password', color: '#fb8c00', width: '65%' };
  return { label: 'Strong password', color: '#43a047', width: '100%' };
}

// 2. Field Component ko BAHAR nikaal diya taake focus issue khatam ho jaye
const Field = ({ name, type = 'text', placeholder, icon: Icon, value, onChange, error, inputBase, iconPos, errBorder, setErrors }) => (
  <div style={{ marginBottom: 12, position: 'relative' }}>
    <Icon size={15} style={iconPos} />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        onChange(e);
        setErrors((prev) => ({ ...prev, [name]: null })); // typing par error hatane ke liye
      }}
      style={{ ...inputBase, ...(error ? errBorder : {}) }}
      className="signup-input"
      onFocus={e => { e.target.style.borderColor = '#0d2a3a'; e.target.style.background = '#fff'; }}
      onBlur={e => { 
        if (!error) {
          e.target.style.borderColor = '#e0e0e0'; 
          e.target.style.background = '#fafafa'; 
        }
      }}
      autoComplete={name}
    />
    {error && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#e53935', fontSize: 12, marginTop: 3 }}>
        <FiAlertCircle size={12} />{error}
      </div>
    )}
  </div>
);

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ fullName: '', username: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const strength = form.password ? getStrength(form.password) : null;

  // Shared Styles
  const inputBase = {
    width: '100%', boxSizing: 'border-box', padding: '11px 14px 11px 40px',
    border: '2px solid #e0e0e0', borderRadius: 9, fontSize: 14,
    fontFamily: "'Segoe UI', sans-serif", transition: 'border-color 0.2s', background: '#fafafa',
  };
  const errBorder = { borderColor: '#e53935' };
  const iconPos = { position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa', pointerEvents: 'none', zIndex: 10 };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name required';
    if (!form.username.trim()) e.username = 'Username required';
    if (!form.email && !form.phone) e.contact = 'Email or phone required';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password required';
    else if (strength && strength.label === 'Weak password') e.password = 'Password too weak';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const vErrors = validate();
    if (Object.keys(vErrors).length > 0) { setErrors(vErrors); return; }
    setLoading(true);
    try {
      const res = await register({ 
        fullName: form.fullName, 
        username: form.username, 
        email: form.email || undefined, 
        phone: form.phone || undefined, 
        password: form.password 
      });
      if (res.success) navigate('/');
      else setError(res.message || 'Registration failed');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
      fontFamily: "'Segoe UI', sans-serif",
      background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1920&auto=format&fit=crop') center/cover no-repeat fixed`,
      padding: '20px',
    }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .signup-card { animation: fadeUp 0.45s ease; }
        .signup-input:focus { outline: none; }
        .signup-btn:hover:not(:disabled) { background: #1a4763 !important; transform: translateY(-1px); }
      `}</style>

      <div className="signup-card" style={{
        background: 'white', borderRadius: 20, boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
        padding: '36px 32px', width: '100%', maxWidth: 420,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <div style={{ width: 52, height: 52, background: '#0d2a3a', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <MdBalance size={26} color="#c9a227" />
          </div>
          <h2 style={{ fontSize: 22, color: '#0d2a3a', margin: '0 0 4px', fontWeight: 800 }}>Create Account</h2>
          <p style={{ color: '#888', fontSize: 13 }}>Join InCrime to access legal templates</p>
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff3f3', border: '1px solid #ffcdd2', color: '#c62828', padding: '10px 14px', borderRadius: 8, marginBottom: 14, fontSize: 14 }}>
            <FiAlertCircle size={16} style={{ flexShrink: 0 }} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Custom Fields */}
          <Field 
            name="fullName" 
            placeholder="Full Name" 
            icon={FiUser} 
            value={form.fullName} 
            onChange={e => setForm({...form, fullName: e.target.value})}
            error={errors.fullName}
            inputBase={inputBase} iconPos={iconPos} errBorder={errBorder} setErrors={setErrors}
          />
          
          <Field 
            name="username" 
            placeholder="Username" 
            icon={FiUser} 
            value={form.username} 
            onChange={e => setForm({...form, username: e.target.value})}
            error={errors.username}
            inputBase={inputBase} iconPos={iconPos} errBorder={errBorder} setErrors={setErrors}
          />

          {/* Email & Phone */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ position: 'relative', marginBottom: 8 }}>
              <FiMail size={15} style={iconPos} />
              <input type="email" placeholder="Email Address" value={form.email}
                onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, contact: null, email: null }); }}
                style={{ ...inputBase, ...(errors.email || errors.contact ? errBorder : {}) }}
                className="signup-input"
                onFocus={e => { e.target.style.borderColor = '#0d2a3a'; e.target.style.background = '#fff'; }}
                onBlur={e => { e.target.style.borderColor = '#e0e0e0'; e.target.style.background = '#fafafa'; }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <FiPhone size={15} style={iconPos} />
              <input type="tel" placeholder="Phone Number (optional)" value={form.phone}
                onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, contact: null }); }}
                style={inputBase} className="signup-input"
                onFocus={e => { e.target.style.borderColor = '#0d2a3a'; e.target.style.background = '#fff'; }}
                onBlur={e => { e.target.style.borderColor = '#e0e0e0'; e.target.style.background = '#fafafa'; }}
              />
            </div>
            {errors.contact && <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#e53935', fontSize: 12, marginTop: 3 }}><FiAlertCircle size={12} />{errors.contact}</div>}
            {errors.email && <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#e53935', fontSize: 12, marginTop: 3 }}><FiAlertCircle size={12} />{errors.email}</div>}
          </div>

          {/* Password */}
          <div style={{ marginBottom: 6, position: 'relative' }}>
            <FiLock size={15} style={iconPos} />
            <input type={showPass ? 'text' : 'password'} placeholder="Password"
              value={form.password}
              onChange={e => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: null }); }}
              style={{ ...inputBase, paddingRight: 42, ...(errors.password ? errBorder : {}) }}
              className="signup-input"
              onFocus={e => { e.target.style.borderColor = '#0d2a3a'; e.target.style.background = '#fff'; }}
              onBlur={e => { e.target.style.borderColor = '#e0e0e0'; e.target.style.background = '#fafafa'; }}
            />
            <button type="button" onClick={() => setShowPass(!showPass)}
              style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', display: 'flex' }}>
              {showPass ? <FiEyeOff size={17} /> : <FiEye size={17} />}
            </button>
          </div>

          {strength && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ height: 4, background: '#f0f0f0', borderRadius: 2, marginBottom: 3 }}>
                <div style={{ height: '100%', width: strength.width, background: strength.color, borderRadius: 2, transition: 'width 0.3s' }} />
              </div>
              <div style={{ fontSize: 12, color: strength.color, fontWeight: 500 }}>{strength.label}</div>
            </div>
          )}
          {errors.password && <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#e53935', fontSize: 12, marginBottom: 8 }}><FiAlertCircle size={12} />{errors.password}</div>}

          {/* Confirm Password */}
          <div style={{ marginBottom: 16, position: 'relative' }}>
            <FiLock size={15} style={iconPos} />
            <input type={showConfirm ? 'text' : 'password'} placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={e => { setForm({ ...form, confirmPassword: e.target.value }); setErrors({ ...errors, confirmPassword: null }); }}
              style={{ ...inputBase, paddingRight: 42, ...(errors.confirmPassword ? errBorder : {}) }}
              className="signup-input"
              onFocus={e => { e.target.style.borderColor = '#0d2a3a'; e.target.style.background = '#fff'; }}
              onBlur={e => { e.target.style.borderColor = '#e0e0e0'; e.target.style.background = '#fafafa'; }}
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', display: 'flex' }}>
              {showConfirm ? <FiEyeOff size={17} /> : <FiEye size={17} />}
            </button>
            {errors.confirmPassword && <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#e53935', fontSize: 12, marginTop: 3 }}><FiAlertCircle size={12} />{errors.confirmPassword}</div>}
          </div>

          <p style={{ fontSize: 11, color: '#aaa', marginBottom: 14, textAlign: 'center', fontStyle: 'italic' }}>
            Password: 8-16 chars, uppercase, number and special character (!@#$%^&*)
          </p>

          <button type="submit" className="signup-btn" disabled={loading} style={{
            background: '#0d2a3a', color: 'white', border: 'none', padding: 13, width: '100%',
            borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 15, transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                Creating Account...
              </span>
            ) : (
              <><FiUserPlus size={16} /> Create Account</>
            )}
          </button>
        </form>

        <div style={{ marginTop: 18, textAlign: 'center', fontSize: 14, color: '#666' }}>
          Already have an account?{' '}
          <a href="/login" onClick={e => { e.preventDefault(); navigate('/login'); }}
            style={{ color: '#0d2a3a', fontWeight: 700, textDecoration: 'none' }}>Login</a>
        </div>
      </div>
    </div>
  );
}