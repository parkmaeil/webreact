// src/pages/AdminPage.js (반응형 예시)
import React, { useState, useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../AuthContext';

export default function AdminPage() {
  const { token } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState('users');
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:8080/auth/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('실패');
      setAccounts(await res.json());
      setError(null);
    } catch (err) {
      setError(err.message);
      setAccounts([]);
    }
  };

  const handleSelect = (key) => {
    setSelected(key);
    if (key === 'users') fetchUsers();
    if (isMobile) setDrawerOpen(false);
  };

  // 사이드바 메뉴 JSX
  const menu = (
    <Box sx={{ width: 200, p: 1, bgcolor: 'background.paper' }}>
      <Typography variant="h6" align="center">
        관리자 메뉴
      </Typography>
      <List>
        <ListItemButton
          selected={selected === 'users'}
          onClick={() => handleSelect('users')}
        >
          <ListItemText primary="사용자 정보 가져오기" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Container sx={{ mt: 4, px: 0 }}>
      <Typography variant="h4" align="center" gutterBottom>
        관리자 페이지
      </Typography>

      {/* 모바일에선 햄버거 버튼으로 Drawer 토글 */}
      {isMobile && (
        <IconButton onClick={() => setDrawerOpen(true)} sx={{ mb: 1 }}>
          <MenuIcon />
        </IconButton>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        {/* 데스크탑: 고정 사이드바 / 모바일: Drawer */}
        {isMobile ? (
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            ModalProps={{ keepMounted: true }}
          >
            {menu}
          </Drawer>
        ) : (
          menu
        )}

        {/* 콘텐츠 영역 */}
        <Box sx={{ flex: 1, p: { xs: 1, sm: 2 } }}>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {selected === 'users' &&
            (accounts.length > 0 ? (
              <Paper>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>아이디</TableCell>
                      <TableCell>이메일</TableCell>
                      <TableCell>권한</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {accounts.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell>{a.id}</TableCell>
                        <TableCell>{a.email}</TableCell>
                        <TableCell>{a.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            ) : (
              <Typography>버튼을 눌러 불러와 주세요.</Typography>
            ))}
        </Box>
      </Box>
    </Container>
  );
}
