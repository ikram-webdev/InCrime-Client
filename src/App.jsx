import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute, PublicRoute } from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Application from './pages/Application';
import Chatbot from './pages/Chatbot';
import MyApplications from './pages/MyApplications';
import AdminDashboard from './pages/AdminDashboard';

// Criminal Templates
import BailPre from './pages/templates/criminal/BailPre';
import BailPost from './pages/templates/criminal/BailPost';
import TheftApplication from './pages/templates/criminal/TheftApplication';
import AttendanceExcused from './pages/templates/criminal/AttendanceExcused';
import Harassment from './pages/templates/criminal/Harassment';
import ConsentApplication from './pages/templates/criminal/ConsentApplication';
import ChallanApplication from './pages/templates/criminal/ChallanApplication';

// Family Templates
import NikahNamaForm from './pages/templates/family/NikahNamaForm';
import ChildCustody from './pages/templates/family/ChildCustody';
import TansikNikah from './pages/templates/family/TansikNikah';
import SecondMarriage from './pages/templates/family/SecondMarriage';
import AzadDarulAman from './pages/templates/family/AzadDarulAman';
import MeetingDarulAman from './pages/templates/family/MeetingDarulAman';
import SendingDarulAman from './pages/templates/family/SendingDarulAman';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes (redirect to home if logged in) */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Routes (require login) */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/how-it-works" element={<ProtectedRoute><HowItWorks /></ProtectedRoute>} />
          <Route path="/application" element={<ProtectedRoute><Application /></ProtectedRoute>} />
          <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
          <Route path="/my-applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />

          {/* Criminal Templates */}
          <Route path="/templates/criminal/bail-pre" element={<ProtectedRoute><BailPre /></ProtectedRoute>} />
          <Route path="/templates/criminal/bail-post" element={<ProtectedRoute><BailPost /></ProtectedRoute>} />
          <Route path="/templates/criminal/theft" element={<ProtectedRoute><TheftApplication /></ProtectedRoute>} />
          <Route path="/templates/criminal/attendance-excused" element={<ProtectedRoute><AttendanceExcused /></ProtectedRoute>} />
          <Route path="/templates/criminal/harassment" element={<ProtectedRoute><Harassment /></ProtectedRoute>} />
          <Route path="/templates/criminal/consent" element={<ProtectedRoute><ConsentApplication /></ProtectedRoute>} />
          <Route path="/templates/criminal/challan" element={<ProtectedRoute><ChallanApplication /></ProtectedRoute>} />

          {/* Family Templates */}
          <Route path="/templates/family/nikah-nama" element={<ProtectedRoute><NikahNamaForm /></ProtectedRoute>} />
          <Route path="/templates/family/child-custody" element={<ProtectedRoute><ChildCustody /></ProtectedRoute>} />
          <Route path="/templates/family/tansik-nikah" element={<ProtectedRoute><TansikNikah /></ProtectedRoute>} />
          <Route path="/templates/family/second-marriage" element={<ProtectedRoute><SecondMarriage /></ProtectedRoute>} />
          <Route path="/templates/family/azad-darul-aman" element={<ProtectedRoute><AzadDarulAman /></ProtectedRoute>} />
          <Route path="/templates/family/meeting-darul-aman" element={<ProtectedRoute><MeetingDarulAman /></ProtectedRoute>} />
          <Route path="/templates/family/sending-darul-aman" element={<ProtectedRoute><SendingDarulAman /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0d2a3a', color: '#fff', fontFamily: "'Segoe UI', sans-serif", textAlign: 'center', padding: 20 }}>
      <div style={{ fontSize: 72, marginBottom: 20 }}>⚖️</div>
      <h1 style={{ fontSize: 48, color: '#FFD700', marginBottom: 10 }}>404</h1>
      <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 30 }}>Page not found</p>
      <a href="/" style={{ background: '#FFD700', color: '#0d2a3a', padding: '12px 30px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>
        ← Go Home
      </a>
    </div>
  );
}

export default App;
