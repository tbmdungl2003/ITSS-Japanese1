import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Stack,
  Alert,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { register } from '../api/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({}); // State để lưu trữ các lỗi
  const navigate = useNavigate();

  // Hàm xác thực cuối cùng trước khi submit
  const validateAll = () => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!username.trim()) newErrors.username = 'Vui lòng nhập tên người dùng';
    if (!emailRegex.test(email)) newErrors.email = 'Định dạng email không hợp lệ';
    if (password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Mật khẩu không khớp';
    if (!agreedToTerms) newErrors.terms = 'Vui lòng đồng ý với điều khoản';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) {
      return;
    }

    try {
      await register({ username, email, password });
      alert('Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Lỗi từ server (ví dụ: email đã tồn tại)
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Email này đã được sử dụng',
        }));
      } else {
        // Các lỗi khác
        setErrors({ api: 'Đã có lỗi xảy ra. Vui lòng thử lại.' });
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        mt: 8,
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" align="center" mb={3}>
        Tạo Tài Khoản
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        {errors.api && <Alert severity="error" sx={{ mb: 2 }}>{errors.api}</Alert>}

        <TextField
          label="Tên người dùng"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          error={!!errors.username}
          helperText={errors.username}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Mật khẩu"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={!!errors.password}
          helperText={errors.password}
        />

        <TextField
          label="Nhập lại Mật khẩu"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              name="agreeTerms"
              color="primary"
            />
          }
          label="Tôi đồng ý với điều khoản người dùng"
        />
        {errors.terms && <Typography color="error" variant="caption" display="block" sx={{ ml: 2 }}>{errors.terms}</Typography>}

        <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Tạo tài khoản
          </Button>

          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            color="secondary"
            fullWidth
          >
            Đã có tài khoản? Đăng nhập
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;