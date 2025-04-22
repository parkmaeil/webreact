// RequireRole.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function RequireRole({ role, children }) {
  const { user } = useContext(AuthContext);

  // 1) 로그인하지 않은 경우 → 로그인 페이지로
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2) 권한이 없는 경우 → 홈(혹은 403 페이지)로
  if (!user.roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // 3) 모두 통과 → 자식(AdminPage) 렌더링
  return children;
}
