import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdBalance } from 'react-icons/md';
import { FiMenu, FiX, FiLogOut, FiFileText, FiShield, FiUser, FiChevronDown } from 'react-icons/fi';

export default function Navbar({ links, showLogin = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const defaultLinks = [
    { label: 'Home', to: '/' },
    { label: 'Case Categories', to: '/#categories' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'Chatbot', to: '/chatbot' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/#contact' },
  ];

  const navLinks = links || defaultLinks;

  const handleNav = (to) => {
    setMenuOpen(false);
    setDropdownOpen(false);
    if (to.startsWith('/#')) {
      if (location.pathname !== '/') navigate('/');
      setTimeout(() => {
        const id = to.replace('/#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(to);
    }
  };

  return (
    <>
      <style>{`
        .incrime-nav { display:flex; justify-content:space-between; align-items:center; padding:14px 60px; background:rgba(13,42,58,0.97); color:#fff; box-shadow:0 3px 10px rgba(0,0,0,0.25); position:sticky; top:0; z-index:1000; backdrop-filter:blur(10px); box-sizing:border-box; }
        .nav-logo { font-size:22px; font-weight:800; cursor:pointer; letter-spacing:0.5px; display:flex; align-items:center; gap:9px; }
        .nav-links { list-style:none; display:flex; gap:20px; margin:0; padding:0; }
        .nav-link-item a { text-decoration:none; color:rgba(255,255,255,0.88); font-weight:500; font-size:14px; transition:color 0.2s; }
        .nav-link-item a:hover { color:#c9a227; }
        .nav-actions { display:flex; align-items:center; gap:12px; }
        .btn-login { background:#c9a227; border:none; color:#0d2a3a; padding:8px 20px; border-radius:8px; font-weight:700; cursor:pointer; font-size:14px; transition:all 0.2s; }
        .btn-login:hover { background:#b08a1e; transform:translateY(-1px); }
        .user-badge { background:rgba(201,162,39,0.15); border:1.5px solid #c9a227; border-radius:8px; padding:7px 14px; color:#c9a227; font-weight:600; font-size:13px; cursor:pointer; position:relative; display:flex; align-items:center; gap:6px; }
        .user-dropdown { position:absolute; top:calc(100% + 10px); right:0; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.18); min-width:195px; overflow:hidden; z-index:2001; border:1px solid #eee; }
        .user-dropdown a, .user-dropdown button { display:flex; align-items:center; gap:10px; width:100%; padding:12px 16px; text-align:left; border:none; background:none; cursor:pointer; color:#0d2a3a; font-size:14px; text-decoration:none; font-weight:500; transition:background 0.15s; box-sizing:border-box; }
        .user-dropdown a:hover, .user-dropdown button:hover { background:#f5f7fa; }
        .hamburger { display:none; background:none; border:none; color:#fff; font-size:24px; cursor:pointer; padding:4px; }
        @media(max-width:900px) {
          .incrime-nav { padding:14px 18px; }
          .nav-links { display:none !important; }
          .hamburger { display:flex; align-items:center; }
        }
        @media(min-width:901px) { .hamburger { display:none !important; } }
      `}</style>

      <nav className="incrime-nav">
        <div className="nav-logo" onClick={() => navigate('/')}>
          <MdBalance color="#c9a227" size={22} /> InCrime
        </div>

        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.label} className="nav-link-item">
              <a href={link.to} onClick={e => { e.preventDefault(); handleNav(link.to); }}>{link.label}</a>
            </li>
          ))}
          {isAdmin && (
            <li className="nav-link-item">
              <a href="/admin" onClick={e => { e.preventDefault(); navigate('/admin'); }} style={{ color: '#c9a227' }}>Admin</a>
            </li>
          )}
        </ul>

        <div className="nav-actions">
          {isAuthenticated ? (
            <div className="user-badge" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <FiUser size={14} /> {user?.username} <FiChevronDown size={13} />
              {dropdownOpen && (
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 2000 }} onClick={() => setDropdownOpen(false)} />
                  <div className="user-dropdown" onClick={e => e.stopPropagation()}>
                    <a href="/my-applications" onClick={e => { e.preventDefault(); navigate('/my-applications'); setDropdownOpen(false); }}>
                      <FiFileText size={15} /> My Applications
                    </a>
                    {isAdmin && (
                      <a href="/admin" onClick={e => { e.preventDefault(); navigate('/admin'); setDropdownOpen(false); }}>
                        <FiShield size={15} /> Admin Panel
                      </a>
                    )}
                    <div style={{ borderTop: '1px solid #f0f0f0' }} />
                    <button onClick={() => { logout(); navigate('/login'); setDropdownOpen(false); }} style={{ color: '#d32f2f !important' }}>
                      <FiLogOut size={15} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            showLogin && <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
          )}
          <button className="hamburger" onClick={() => setMenuOpen(true)}>
            <FiMenu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 2999 }} onClick={() => setMenuOpen(false)} />
          <div style={{ position: 'fixed', top: 0, right: 0, width: 280, height: '100vh', background: '#0d2a3a', zIndex: 3000, padding: '20px 0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#c9a227', fontWeight: 800, fontSize: 18 }}>
                <MdBalance size={20} /> InCrime
              </div>
              <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}>
                <FiX size={22} />
              </button>
            </div>
            <ul style={{ listStyle: 'none', padding: '12px 0', margin: 0, flex: 1, overflowY: 'auto' }}>
              {navLinks.map(link => (
                <li key={link.label}>
                  <a href={link.to} onClick={e => { e.preventDefault(); handleNav(link.to); }} style={{ display: 'block', padding: '13px 24px', color: 'rgba(255,255,255,0.88)', textDecoration: 'none', fontSize: 15, fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,0.06)', transition: 'background 0.15s' }}>
                    {link.label}
                  </a>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <a href="/admin" onClick={e => { e.preventDefault(); navigate('/admin'); setMenuOpen(false); }} style={{ display: 'block', padding: '13px 24px', color: '#c9a227', textDecoration: 'none', fontSize: 15, fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    Admin Panel
                  </a>
                </li>
              )}
              {isAuthenticated ? (
                <>
                  <li>
                    <a href="/my-applications" onClick={e => { e.preventDefault(); navigate('/my-applications'); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 24px', color: 'rgba(255,255,255,0.88)', textDecoration: 'none', fontSize: 15, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <FiFileText size={15} /> My Applications
                    </a>
                  </li>
                  <li>
                    <button onClick={() => { logout(); navigate('/login'); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '13px 24px', background: 'none', border: 'none', color: '#ff6b6b', fontSize: 15, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                      <FiLogOut size={15} /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <li style={{ padding: '16px 24px' }}>
                  <button onClick={() => { navigate('/login'); setMenuOpen(false); }} style={{ background: '#c9a227', color: '#0d2a3a', border: 'none', padding: '12px 24px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', width: '100%', fontSize: 15 }}>
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
