import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <Container style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Material UI 예시
      </Typography>
      <Button variant="contained" color="primary">
        클릭하세요
      </Button>
    </Container>
  );
}

export default App;
