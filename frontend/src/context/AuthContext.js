import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

// 1. Tạo Context
export const AuthContext = createContext();

// 2. Tạo Provider Component
export const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  // Effect này sẽ chạy một lần khi ứng dụng khởi động để kiểm tra token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Nếu có token, đặt nó vào header của axios cho các request sau
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Gọi API để xác thực token và lấy thông tin người dùng
      api.get('/api/auth/user')
        .then(response => {
          // Nếu token hợp lệ, cập nhật lại context
          setAuth({
            isAuthenticated: true,
            user: response.data, // response.data chính là đối tượng user
            token: token,
          });
        })
        .catch(() => {
          // Nếu token không hợp lệ, xóa nó đi
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        });
    }
  }, []); // Mảng rỗng đảm bảo effect chỉ chạy một lần

  // 3. Cung cấp state và hàm setAuth cho các component con
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

