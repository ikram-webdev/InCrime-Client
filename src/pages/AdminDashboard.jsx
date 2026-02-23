import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const COLORS = { primary: '#0d2a3a', gold: '#FFD700', bg: '#f0f2f5', white: '#ffffff' };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [modalData, setModalData] = useState(null);

  const showAlert = (msg, type = 'success') => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  useEffect(() => {
    if (activePage === 'dashboard') fetchStats();
    else if (activePage === 'users') fetchUsers();
    else if (activePage === 'applications') fetchApplications();
    else if (activePage === 'contacts') fetchContacts();
    else if (activePage === 'categories') fetchCategories();
    else if (activePage === 'templates') fetchTemplates();
  }, [activePage]);

  const fetchStats = async () => {
    setLoading(true);
    try { const { data } = await axios.get('/api/admin/stats'); if (data.success) setStats(data); }
    catch (e) { showAlert('Error loading stats', 'error'); }
    finally { setLoading(false); }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try { const { data } = await axios.get(`/api/admin/users?search=${search}`); if (data.success) setUsers(data.users); }
    catch (e) { showAlert('Error loading users', 'error'); }
    finally { setLoading(false); }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try { const { data } = await axios.get('/api/admin/applications'); if (data.success) setApplications(data.applications); }
    catch (e) { showAlert('Error loading applications', 'error'); }
    finally { setLoading(false); }
  };

  const fetchContacts = async () => {
    setLoading(true);
    try { const { data } = await axios.get('/api/admin/contacts'); if (data.success) setContacts(data.contacts); }
    catch (e) { showAlert('Error loading contacts', 'error'); }
    finally { setLoading(false); }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try { const { data } = await axios.get('/api/categories'); if (data.success) setCategories(data.categories); }
    catch (e) { showAlert('Error loading categories', 'error'); }
    finally { setLoading(false); }
  };

  const fetchTemplates = async () => {
    setLoading(true);
    try { const { data } = await axios.get('/api/templates/all'); if (data.success) setTemplates(data.templates); }
    catch (e) { showAlert('Error loading templates', 'error'); }
    finally { setLoading(false); }
  };

  const toggleUser = async (id) => {
    try {
      const { data } = await axios.put(`/api/admin/users/${id}/toggle`);
      if (data.success) { showAlert(data.message); fetchUsers(); }
    } catch (e) { showAlert('Error toggling user', 'error'); }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user and all their data?')) return;
    try {
      await axios.delete(`/api/admin/users/${id}`);
      showAlert('User deleted');
      fetchUsers();
    } catch (e) { showAlert('Error deleting user', 'error'); }
  };

  const deleteTemplate = async (id) => {
    if (!window.confirm('Delete this template?')) return;
    try {
      await axios.delete(`/api/templates/${id}`);
      showAlert('Template deleted');
      fetchTemplates();
    } catch (e) { showAlert('Error deleting template', 'error'); }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await axios.delete(`/api/categories/${id}`);
      showAlert('Category deleted');
      fetchCategories();
    } catch (e) { showAlert('Error deleting category', 'error'); }
  };

  const updateContactStatus = async (id, status) => {
    try {
      await axios.put(`/api/admin/contacts/${id}/status`, { status });
      showAlert('Contact updated');
      fetchContacts();
    } catch (e) { showAlert('Error updating contact', 'error'); }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'applications', label: 'Applications', icon: '📋' },
    { id: 'templates', label: 'Templates', icon: '📄' },
    { id: 'categories', label: 'Categories', icon: '📂' },
    { id: 'contacts', label: 'Reviews & Contact', icon: '💬' },
  ];

  const StatCard = ({ label, value, icon, color = COLORS.primary }) => (
    <div style={{ background: COLORS.white, borderRadius: 16, padding: '25px 20px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', borderTop: `4px solid ${color}`, textAlign: 'center' }}>
      <div style={{ fontSize: 36, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 32, fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: 14, color: '#888', marginTop: 4 }}>{label}</div>
    </div>
  );

  const Table = ({ headers, children }) => (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: COLORS.white, borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
        <thead>
          <tr style={{ background: COLORS.primary }}>
            {headers.map(h => <th key={h} style={{ padding: '14px 16px', color: COLORS.gold, textAlign: 'left', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );

  const Tr = ({ children, odd }) => (
    <tr style={{ background: odd ? '#fafafa' : COLORS.white, borderBottom: '1px solid #f0f0f0' }}>
      {children}
    </tr>
  );

  const Td = ({ children }) => (
    <td style={{ padding: '12px 16px', fontSize: 14, color: '#333', whiteSpace: 'nowrap' }}>{children}</td>
  );

  const Btn = ({ onClick, color = COLORS.primary, children, small }) => (
    <button onClick={onClick} style={{ background: color, color: '#fff', border: 'none', padding: small ? '5px 12px' : '8px 16px', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: small ? 12 : 13, marginRight: 6 }}>
      {children}
    </button>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: COLORS.bg }}>
      <style>{`
        @media(max-width:768px) {
          .admin-sidebar { position: fixed !important; left: ${sidebarOpen ? '0' : '-260px'} !important; z-index: 1000; transition: left 0.3s; }
          .admin-main { margin-left: 0 !important; }
          .stats-grid-admin { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ width: 240, background: COLORS.primary, color: '#fff', display: 'flex', flexDirection: 'column', position: 'fixed', left: 0, top: 0, height: '100vh', overflowY: 'auto', zIndex: 100 }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.gold }}>⚖️ InCrime</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Admin Panel</div>
        </div>

        <div style={{ padding: '10px 12px', flex: 1 }}>
          {navItems.map(item => (
            <div key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                padding: '12px 16px', borderRadius: 10, cursor: 'pointer', marginBottom: 4,
                background: activePage === item.id ? 'rgba(255,215,0,0.15)' : 'transparent',
                borderLeft: activePage === item.id ? `3px solid ${COLORS.gold}` : '3px solid transparent',
                color: activePage === item.id ? COLORS.gold : 'rgba(255,255,255,0.8)',
                fontWeight: activePage === item.id ? 700 : 400,
                fontSize: 14, display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (activePage !== item.id) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { if (activePage !== item.id) e.currentTarget.style.background = 'transparent'; }}
            >
              <span>{item.icon}</span> {item.label}
            </div>
          ))}
        </div>

        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>👤 {user?.fullName}</div>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '7px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 12, width: '100%', marginBottom: 6 }}>🌐 View Site</button>
          <button onClick={() => { logout(); navigate('/login'); }} style={{ background: '#e53935', border: 'none', color: '#fff', padding: '7px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 12, width: '100%' }}>🚪 Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main" style={{ marginLeft: 240, flex: 1, padding: '30px', minHeight: '100vh' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 15 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, color: COLORS.primary, fontWeight: 800 }}>
              {navItems.find(n => n.id === activePage)?.icon} {navItems.find(n => n.id === activePage)?.label}
            </h1>
            <p style={{ margin: '4px 0 0', color: '#888', fontSize: 13 }}>InCrime Administration Panel</p>
          </div>
          <button onClick={() => window.location.reload()} style={{ background: COLORS.white, border: '1px solid #ddd', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', color: '#555', fontWeight: 600 }}>
            🔄 Refresh
          </button>
        </div>

        {/* Alert */}
        {alert && (
          <div style={{ background: alert.type === 'error' ? '#ffebee' : '#e8f5e9', color: alert.type === 'error' ? '#c62828' : '#2e7d32', padding: '12px 20px', borderRadius: 10, marginBottom: 20, fontWeight: 600, border: `1px solid ${alert.type === 'error' ? '#ffcdd2' : '#a5d6a7'}` }}>
            {alert.type === 'error' ? '❌' : '✅'} {alert.msg}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>⏳</div>
            <p>Loading...</p>
          </div>
        )}

        {/* DASHBOARD */}
        {activePage === 'dashboard' && !loading && stats && (
          <>
            <div className="stats-grid-admin" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 30 }}>
              <StatCard label="Total Users" value={stats.stats.totalUsers} icon="👥" color="#1565c0" />
              <StatCard label="Total Applications" value={stats.stats.totalApplications} icon="📋" color="#2e7d32" />
              <StatCard label="Templates" value={stats.stats.totalTemplates} icon="📄" color="#e65100" />
              <StatCard label="New Messages" value={stats.stats.newContacts} icon="💬" color="#6a1b9a" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={{ background: COLORS.white, borderRadius: 16, padding: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
                <h3 style={{ margin: '0 0 20px', color: COLORS.primary, fontSize: 18 }}>🆕 Recent Users</h3>
                {stats.recentUsers.map(u => (
                  <div key={u._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>👤 {u.fullName}</div>
                      <div style={{ fontSize: 12, color: '#888' }}>@{u.username}</div>
                    </div>
                    <div style={{ fontSize: 12, color: '#888' }}>{new Date(u.createdAt).toLocaleDateString('en-PK')}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: COLORS.white, borderRadius: 16, padding: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
                <h3 style={{ margin: '0 0 20px', color: COLORS.primary, fontSize: 18 }}>📊 Applications by Type</h3>
                {stats.applicationsByType.map(t => (
                  <div key={t._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{t._id || 'Unknown'}</div>
                    <div style={{ background: COLORS.primary, color: COLORS.gold, padding: '4px 14px', borderRadius: 20, fontWeight: 700, fontSize: 14 }}>{t.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* USERS */}
        {activePage === 'users' && !loading && (
          <>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && fetchUsers()} placeholder="🔍 Search users..." style={{ padding: '10px 16px', border: '2px solid #e0e0e0', borderRadius: 8, fontSize: 14, flex: 1, minWidth: 200 }} />
              <button onClick={fetchUsers} style={{ background: COLORS.primary, color: COLORS.gold, border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>Search</button>
            </div>
            <Table headers={['#', 'Name', 'Username', 'Email/Phone', 'Status', 'Joined', 'Actions']}>
              {users.map((u, i) => (
                <Tr key={u._id} odd={i % 2 === 0}>
                  <Td>{i + 1}</Td>
                  <Td><strong>{u.fullName}</strong></Td>
                  <Td>@{u.username}</Td>
                  <Td>{u.email || u.phone || '—'}</Td>
                  <Td>
                    <span style={{ background: u.isActive ? '#e8f5e9' : '#ffebee', color: u.isActive ? '#2e7d32' : '#c62828', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                      {u.isActive ? '✅ Active' : '🚫 Inactive'}
                    </span>
                  </Td>
                  <Td>{new Date(u.createdAt).toLocaleDateString('en-PK')}</Td>
                  <Td>
                    <Btn onClick={() => toggleUser(u._id)} color={u.isActive ? '#fb8c00' : '#2e7d32'} small>
                      {u.isActive ? '🚫 Deactivate' : '✅ Activate'}
                    </Btn>
                    <Btn onClick={() => deleteUser(u._id)} color="#e53935" small>🗑️ Delete</Btn>
                  </Td>
                </Tr>
              ))}
            </Table>
            {users.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>No users found</div>}
          </>
        )}

        {/* APPLICATIONS */}
        {activePage === 'applications' && !loading && (
          <>
            <Table headers={['#', 'User', 'Template', 'Category', 'Status', 'Date']}>
              {applications.map((a, i) => (
                <Tr key={a._id} odd={i % 2 === 0}>
                  <Td>{i + 1}</Td>
                  <Td><strong>{a.user?.fullName || '—'}</strong><br /><span style={{ fontSize: 12, color: '#888' }}>@{a.user?.username}</span></Td>
                  <Td>{a.templateTitle || a.templateSlug}</Td>
                  <Td><span style={{ background: '#e3f2fd', color: '#1565c0', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, textTransform: 'capitalize' }}>{a.categoryType || '—'}</span></Td>
                  <Td><span style={{ background: '#f3e5f5', color: '#6a1b9a', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{a.status}</span></Td>
                  <Td>{new Date(a.createdAt).toLocaleDateString('en-PK')}</Td>
                </Tr>
              ))}
            </Table>
            {applications.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>No applications found</div>}
          </>
        )}

        {/* TEMPLATES */}
        {activePage === 'templates' && !loading && (
          <>
            <Table headers={['#', 'Title', 'Slug', 'Category', 'Usage', 'Status', 'Actions']}>
              {templates.map((t, i) => (
                <Tr key={t._id} odd={i % 2 === 0}>
                  <Td>{i + 1}</Td>
                  <Td><strong>{t.title}</strong></Td>
                  <Td><code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>{t.slug}</code></Td>
                  <Td>{t.category?.name || t.categoryType}</Td>
                  <Td>{t.usageCount || 0}</Td>
                  <Td>
                    <span style={{ background: t.isActive ? '#e8f5e9' : '#ffebee', color: t.isActive ? '#2e7d32' : '#c62828', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                      {t.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </Td>
                  <Td>
                    <Btn onClick={() => setModalData({ type: 'editTemplate', data: t })} color={COLORS.primary} small>✏️ Edit</Btn>
                    <Btn onClick={() => deleteTemplate(t._id)} color="#e53935" small>🗑️ Delete</Btn>
                  </Td>
                </Tr>
              ))}
            </Table>
            {templates.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>No templates found</div>}
          </>
        )}

        {/* CATEGORIES */}
        {activePage === 'categories' && !loading && (
          <>
            <button onClick={() => setModalData({ type: 'addCategory' })} style={{ background: COLORS.primary, color: COLORS.gold, border: 'none', padding: '10px 22px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, marginBottom: 20 }}>
              + Add Category
            </button>
            <Table headers={['#', 'Icon', 'Name', 'Type', 'Status', 'Created', 'Actions']}>
              {categories.map((c, i) => (
                <Tr key={c._id} odd={i % 2 === 0}>
                  <Td>{i + 1}</Td>
                  <Td style={{ fontSize: 24 }}>{c.icon}</Td>
                  <Td><strong>{c.name}</strong></Td>
                  <Td><span style={{ background: '#e3f2fd', color: '#1565c0', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, textTransform: 'capitalize' }}>{c.type}</span></Td>
                  <Td><span style={{ background: c.isActive ? '#e8f5e9' : '#ffebee', color: c.isActive ? '#2e7d32' : '#c62828', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{c.isActive ? 'Active' : 'Inactive'}</span></Td>
                  <Td>{new Date(c.createdAt).toLocaleDateString('en-PK')}</Td>
                  <Td>
                    <Btn onClick={() => setModalData({ type: 'editCategory', data: c })} color={COLORS.primary} small>✏️ Edit</Btn>
                    <Btn onClick={() => deleteCategory(c._id)} color="#e53935" small>🗑️ Delete</Btn>
                  </Td>
                </Tr>
              ))}
            </Table>
          </>
        )}

        {/* CONTACTS */}
        {activePage === 'contacts' && !loading && (
          <Table headers={['#', 'Name', 'Email', 'Subject', 'Type', 'Rating', 'Status', 'Date', 'Actions']}>
            {contacts.map((c, i) => (
              <Tr key={c._id} odd={i % 2 === 0}>
                <Td>{i + 1}</Td>
                <Td><strong>{c.name}</strong></Td>
                <Td>{c.email}</Td>
                <Td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.subject}</Td>
                <Td><span style={{ background: '#fff8e1', color: '#f57f17', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, textTransform: 'capitalize' }}>{c.type}</span></Td>
                <Td>{c.rating ? '⭐'.repeat(c.rating) : '—'}</Td>
                <Td><span style={{ background: c.status === 'new' ? '#e3f2fd' : '#e8f5e9', color: c.status === 'new' ? '#1565c0' : '#2e7d32', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{c.status}</span></Td>
                <Td>{new Date(c.createdAt).toLocaleDateString('en-PK')}</Td>
                <Td>
                  <Btn onClick={() => setModalData({ type: 'viewContact', data: c })} color={COLORS.primary} small>👁️ View</Btn>
                  <Btn onClick={() => updateContactStatus(c._id, 'read')} color="#fb8c00" small>✓ Mark Read</Btn>
                </Td>
              </Tr>
            ))}
          </Table>
        )}
      </main>

      {/* Modal */}
      {modalData && (
        <AdminModal
          data={modalData}
          onClose={() => setModalData(null)}
          onSuccess={(msg) => { showAlert(msg); setModalData(null); fetchCategories(); fetchTemplates(); }}
        />
      )}
    </div>
  );
}

function AdminModal({ data, onClose, onSuccess }) {
  const [form, setForm] = useState(data.data || {});
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (data.type === 'addCategory') {
        await axios.post('/api/categories', form);
        onSuccess('Category created!');
      } else if (data.type === 'editCategory') {
        await axios.put(`/api/categories/${form._id}`, form);
        onSuccess('Category updated!');
      } else if (data.type === 'editTemplate') {
        await axios.put(`/api/templates/${form._id}`, form);
        onSuccess('Template updated!');
      }
    } catch (e) {
      alert(e.response?.data?.message || 'Error saving');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', boxSizing: 'border-box', padding: '10px 14px', border: '2px solid #e0e0e0', borderRadius: 8, fontSize: 14, marginBottom: 14 };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '35px', width: '100%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
          <h3 style={{ margin: 0, color: '#0d2a3a', fontSize: 20 }}>
            {data.type === 'addCategory' ? '➕ Add Category' :
             data.type === 'editCategory' ? '✏️ Edit Category' :
             data.type === 'editTemplate' ? '✏️ Edit Template' : '📩 Contact Details'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#666' }}>✕</button>
        </div>

        {data.type === 'viewContact' ? (
          <div>
            <p><strong>Name:</strong> {data.data.name}</p>
            <p><strong>Email:</strong> {data.data.email}</p>
            <p><strong>Phone:</strong> {data.data.phone || '—'}</p>
            <p><strong>Subject:</strong> {data.data.subject}</p>
            <p><strong>Message:</strong></p>
            <div style={{ background: '#f8f9fa', padding: 15, borderRadius: 8, lineHeight: 1.7, color: '#444' }}>{data.data.message}</div>
            {data.data.rating && <p><strong>Rating:</strong> {'⭐'.repeat(data.data.rating)}</p>}
          </div>
        ) : (
          <>
            {(data.type === 'addCategory' || data.type === 'editCategory') && (
              <>
                <label style={{ fontWeight: 600, fontSize: 13 }}>Category Name</label>
                <input value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="e.g. Criminal Cases" />
                <label style={{ fontWeight: 600, fontSize: 13 }}>Type</label>
                <select value={form.type || 'other'} onChange={e => setForm({ ...form, type: e.target.value })} style={inputStyle}>
                  <option value="criminal">Criminal</option>
                  <option value="family">Family</option>
                  <option value="civil">Civil</option>
                  <option value="other">Other</option>
                </select>
                <label style={{ fontWeight: 600, fontSize: 13 }}>Icon (emoji)</label>
                <input value={form.icon || ''} onChange={e => setForm({ ...form, icon: e.target.value })} style={inputStyle} placeholder="e.g. ⚖️" />
                <label style={{ fontWeight: 600, fontSize: 13 }}>Description</label>
                <textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, height: 80 }} placeholder="Category description..." />
              </>
            )}
            {data.type === 'editTemplate' && (
              <>
                <label style={{ fontWeight: 600, fontSize: 13 }}>Template Title</label>
                <input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} style={inputStyle} />
                <label style={{ fontWeight: 600, fontSize: 13 }}>Description</label>
                <textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, height: 80 }} />
                <label style={{ fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={form.isActive !== false} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
                  Active
                </label>
              </>
            )}
            <button onClick={handleSave} disabled={loading} style={{ width: '100%', padding: 13, background: '#0d2a3a', color: '#FFD700', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', marginTop: 15 }}>
              {loading ? '⏳ Saving...' : '💾 Save Changes'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
