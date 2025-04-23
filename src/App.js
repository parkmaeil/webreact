// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RequireRole from './RequireRole';
import AdminPage from './pages/AdminPage';
import Logout from './pages/Logout';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="logout" element={<Logout />} />
            {/* Admin 전용 페이지 */}
            <Route
              path="admin"
              element={
                <RequireRole role="ROLE_ADMIN">
                  <AdminPage />
                </RequireRole>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
