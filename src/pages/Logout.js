// src/pages/Logout.js
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // 1) Context에서 로그아웃
    navigate('/', { replace: true }); // 2) 홈으로 이동
  }, [logout, navigate]);

  return null; // UI는 없음
}
