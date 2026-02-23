import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, [page]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/applications/my?page=${page}&limit=10`);
      setApplications(data.applications);
      setPagination(data.pagination);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = { draft: '#999', generated: '#007bff', downloaded: '#28a745', submitted: '#FFD700' };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, flexWrap: 'wrap', gap: 15 }}>
          <div>
            <h1 style={{ fontSize: 28, color: '#0d2a3a', fontWeight: 800, margin: 0 }}>📋 My Applications</h1>
            <p style={{ color: '#888', margin: '5px 0 0', fontSize: 14 }}>Your generated legal document history</p>
          </div>
          <button onClick={() => navigate('/application')} style={{ background: '#0d2a3a', color: '#FFD700', border: 'none', padding: '12px 24px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
            + New Application
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
            <div style={{ fontSize: 40, marginBottom: 15 }}>⏳</div>
            <p>Loading your applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 15px rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>📄</div>
            <h3 style={{ color: '#0d2a3a', marginBottom: 10 }}>No Applications Yet</h3>
            <p style={{ color: '#888', marginBottom: 25 }}>You haven't generated any legal documents yet.</p>
            <button onClick={() => navigate('/application')} style={{ background: '#0d2a3a', color: '#FFD700', border: 'none', padding: '12px 28px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
              Create Your First Document
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              {applications.map(app => (
                <div key={app._id} style={{ background: '#fff', borderRadius: 12, padding: '22px 25px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 15 }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, color: '#0d2a3a', fontSize: 16, fontWeight: 700 }}>
                      ⚖️ {app.templateTitle || app.templateSlug}
                    </h4>
                    <div style={{ display: 'flex', gap: 15, marginTop: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 13, color: '#888' }}>📂 {app.categoryType || 'N/A'}</span>
                      <span style={{ fontSize: 13, color: '#888' }}>📅 {new Date(app.createdAt).toLocaleDateString('en-PK')}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ background: statusColors[app.status] || '#999', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      {app.status}
                    </span>
                    <button
                      onClick={() => navigate(`/templates/${app.categoryType}/${app.templateSlug?.split('/').pop() || ''}`)}
                      style={{ background: '#f0f0f0', border: 'none', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#0d2a3a' }}
                    >
                      Reopen →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {pagination.pages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 30 }}>
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)} style={{
                    width: 38, height: 38, borderRadius: '50%', border: 'none', cursor: 'pointer',
                    background: p === page ? '#0d2a3a' : '#fff', color: p === page ? '#FFD700' : '#333',
                    fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}>{p}</button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
