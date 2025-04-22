// src/pages/HomePage.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function HomePage() {
  return (
    <Container sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          mt: 4,
        }}
      >
        <MenuBookIcon sx={{ fontSize: 40 }} />
        <Typography variant="h3">AI 기반 도서 추천 플랫폼</Typography>
      </Box>
    </Container>
  );
}
