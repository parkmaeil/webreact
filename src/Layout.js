// src/Layout.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function Layout({ children }) {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* 헤더 */}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            AI 온라인 서점
          </Typography>

          {user ? (
            <>
              <Typography sx={{ mr: 2 }}>{user.email}님</Typography>
              {/* 로그아웃은 /logout 으로만 이동 */}
              <Button color="inherit" component={Link} to="/logout">
                로그아웃
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              로그인
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* 메인 콘텐츠 */}
      <Box component="main" sx={{ minHeight: '80vh', py: 4 }}>
        {children}
      </Box>

      {/* 푸터 */}
      <Box
        component="footer"
        sx={{
          textAlign: 'center',
          py: 2,
          bgcolor: '#f5f5f5',
        }}
      >
        <Typography variant="body2">
          © 2025 AI Bookstore. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}
