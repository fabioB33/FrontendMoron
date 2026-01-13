import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AIProvider } from './contexts/AIContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from './components/ui/sonner';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { NuevaSolicitudPage } from './pages/NuevaSolicitudPage';
import { MisSolicitudesPage } from './pages/MisSolicitudesPage';
import { SolicitudesPage } from './pages/SolicitudesPage';
import { InspeccionesPage } from './pages/InspeccionesPage';
import { EstadisticasPage } from './pages/EstadisticasPage';
import { VerificarCertificadoPage } from './pages/VerificarCertificadoPage';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <AIProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verificar-certificado/:afapId" element={<VerificarCertificadoPage />} />

            {/* Protected Routes - All users */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            
            {/* Protected Routes - Ciudadano */}
            <Route
              path="/nueva-solicitud"
              element={
                <ProtectedRoute allowedRoles={['ciudadano']}>
                  <NuevaSolicitudPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/mis-solicitudes"
              element={
                <ProtectedRoute allowedRoles={['ciudadano']}>
                  <MisSolicitudesPage />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes - Inspector & Admin */}
            <Route
              path="/solicitudes"
              element={
                <ProtectedRoute allowedRoles={['inspector', 'administrador']}>
                  <SolicitudesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/inspecciones"
              element={
                <ProtectedRoute allowedRoles={['inspector', 'administrador']}>
                  <InspeccionesPage />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes - Admin only */}
            <Route
              path="/estadisticas"
              element={
                <ProtectedRoute allowedRoles={['administrador']}>
                  <EstadisticasPage />
                </ProtectedRoute>
              }
            />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" richColors />
        </BrowserRouter>
      </AIProvider>
    </AuthProvider>
  );
}

export default App;