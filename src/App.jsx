import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { LoadingSpinner } from './components/UI';

// Pages
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { LawyerDashboard } from './pages/LawyerDashboard';
import { ClientDashboard } from './pages/ClientDashboard';
import { NewCasePage } from './pages/NewCasePage';
import { HomePage } from './pages/HomePage';

/**
 * Protected Route component
 */
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, userData, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userData?.userType !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/**
 * App Routes
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard/lawyer"
        element={
          <ProtectedRoute requiredRole="lawyer">
            <LawyerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/client"
        element={
          <ProtectedRoute requiredRole="client">
            <ClientDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/new-case"
        element={
          <ProtectedRoute requiredRole="client">
            <NewCasePage />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

/**
 * Main App Component
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <AppRoutes />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
