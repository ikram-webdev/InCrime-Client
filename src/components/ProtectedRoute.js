import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        height: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#0d2a3a', color: '#FFD700',
        fontFamily: "'Segoe UI', sans-serif",
      }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>⚖️</div>
        <div style={{ fontSize: 20, fontWeight: 600 }}>Loading InCrime...</div>
        <div style={{
          marginTop: 20, width: 60, height: 4, background: '#FFD700',
          borderRadius: 2, animation: 'pulse 1s ease-in-out infinite alternate',
        }} />
        <style>{`@keyframes pulse { from { width: 30px; } to { width: 90px; } }`}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}

export function PublicRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return null;
  if (isAuthenticated) {
    return <Navigate to={isAdmin ? '/admin' : '/'} replace />;
  }

  return children;
}
