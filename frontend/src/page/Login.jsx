import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { loginAction } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Xóa lỗi cũ trước khi submit

    try {
      const response = await loginAction({ email, password });
      const { token, user } = response.data;

      // Lưu token vào localStorage
      localStorage.setItem('token', token);

      // Thêm token vào header mặc định của axios theo chuẩn Bearer Token
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Cập nhật trạng thái AuthContext
      setAuth({
        isAuthenticated: true,
        user,
        token,
      });

      // Chuyển hướng đến dashboard
      navigate('/');
    } catch (err) {
      // Nếu có lỗi từ server (ví dụ: sai credentials), hiển thị lỗi
      if (err.response && err.response.data) {
        setError(err.response.data.msg || 'エラーが発生しました。もう一度お試しください。');
      } else {
        setError('サーバーに接続できません。接続を確認してください。');
      }
      console.error('Login failed:', err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            ログイン
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                {"アカウントをお持ちでないですか？ 新規登録"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;