import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios'; // Import axios instance

// 1. Tạo Context
export const AuthContext = createContext();

// 2. Tạo Provider Component
export const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true, // Thêm trạng thái loading để xử lý việc tải ban đầu
  });

  const logout = () => {
    // 1. Xóa token khỏi localStorage
    localStorage.removeItem('token');
    // 2. Xóa header Authorization khỏi các request trong tương lai
    delete api.defaults.headers.common['Authorization'];
    // 3. Reset lại trạng thái auth
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.get('/auth') // Sử dụng route GET /auth đã có
        .then(res => {
          setAuth({ isAuthenticated: true, user: res.data, token, loading: false });
        })
        .catch(() => {
          localStorage.removeItem('token');
          setAuth({ isAuthenticated: false, user: null, token: null, loading: false });
        });
    } else {
      setAuth(prev => ({ ...prev, loading: false })); // Nếu không có token, dừng loading
    }
  }, []);

  // 3. Cung cấp state và hàm setAuth cho các component con
  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {/* Chỉ render các component con khi đã kiểm tra xong token */}
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};