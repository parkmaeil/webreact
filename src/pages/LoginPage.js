// src/pages/LoginPage.js
import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { jwtDecode } from 'jwt-decode';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('인증에 실패했습니다. 다시 시도해주세요.');

      const { token } = await res.json();
      login(token); // Context에 저장

      // 권한 분기 이동
      const d = jwtDecode(token);
      const roles = d.scope?.split(' ') || [];
      if (roles.includes('ROLE_ADMIN')) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }

      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        로그인
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="이메일"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="비밀번호"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>
          로그인
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Container>
  );
}
