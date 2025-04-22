// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  // 초기 토큰과 사용자 정보 동기화
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem('token');
    if (!t) return null;
    try {
      const d = jwtDecode(t);
      return {
        email: d.sub || d.email,
        roles: d.scope?.split(' ') || [],
      };
    } catch {
      return null;
    }
  });

  // 토큰 변경 시 로컬스토리지만 동기화
  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  // 로그인: 토큰 저장 & user 즉시 세팅
  const login = (newToken) => {
    setToken(newToken);
    try {
      const d = jwtDecode(newToken);
      setUser({
        email: d.sub || d.email,
        roles: d.scope?.split(' ') || [],
      });
    } catch {
      setUser(null);
    }
  };
  // 로그아웃: 토큰·user 초기화
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
