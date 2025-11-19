import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Avatar,
    Grid,
    Divider,
    Button,
    TextField,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { updateUserProfile } from '../api/api'; 

// --- Component Hiển thị Trường Dữ liệu (Dạng View) ---
const DataField = ({ label, value }) => (
    <Box sx={{ display: 'flex', mb: 1, alignItems: 'baseline' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', width: 120 }}>
            {label}:
        </Typography>
        <Typography variant="body1" color="text.primary">
            {value || 'Chưa cập nhật'}
        </Typography>
    </Box>
);

// --- Component Hiển thị Trường Dữ liệu (Dạng Edit) ---
const EditField = ({ label, name, value, onChange, type = 'text', multiline = false }) => (
    <Box sx={{ mb: 2 }}>
        <TextField
            fullWidth
            label={label}
            name={name}
            value={value || ''}
            onChange={onChange}
            type={type}
            multiline={multiline}
            rows={multiline ? 3 : 1}
            size="small"
        />
    </Box>
);

/**
 * Hàm định dạng ngày tháng từ ISO string (YYYY-MM-DDTHH:mm:ss.sssZ) sang DD/MM/YYYY
 * @param {string} isoDateString - Chuỗi ngày tháng ở định dạng ISO.
 * @returns {string|null} - Chuỗi ngày tháng đã định dạng hoặc null nếu đầu vào không hợp lệ.
 */
const formatDateToDDMMYYYY = (isoDateString) => {
    if (!isoDateString) return null;
    try {
        const date = new Date(isoDateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng trong JS bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } catch (error) {
        return isoDateString; // Trả về chuỗi gốc nếu có lỗi
    }
};

const Profile = () => {
    // Giả định AuthContext cung cấp auth.user và hàm updateProfile
    const { auth, setAuth, logout } = useContext(AuthContext); 

    // Sử dụng user data từ AuthContext hoặc dữ liệu mẫu nếu chưa có
    const user = auth.user 

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user);
    const [loading, setLoading] = useState(false);
    
    // Chỉ chạy một lần khi auth.user được tải lần đầu
    React.useEffect(() => { 
        if (auth.user) { 
            setFormData(auth.user); 
        } 
    }, [auth.user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            // Chỉ cho phép nhập số cho trường điện thoại
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData({
                ...formData,
                [name]: numericValue,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSave = async () => {
        setLoading(true);
        // 6. Lưu các thay đổi của bạn (Gửi lên API)
        try {
            const response = await updateUserProfile(formData);
            const updatedUser = response.data;
            setAuth(prevAuth => ({
                ...prevAuth,
                user: updatedUser,
            }));
            setIsEditing(false);
        } catch (error) {
            console.error('Update failed:', error.response?.data?.msg || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData(user);
        setIsEditing(false);
    };

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 2, mb: 4 }}>
            {/* 2. Tiêu đề trang */}
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                プロファイル (Profile)
            </Typography>

            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ p: 4 }}>
                    <Grid container spacing={4}>
                        
                        {/* 3. Ảnh/View đổi hồ sơ */}
                        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                            <Avatar sx={{ width: 160, height: 160, margin: 'auto', mb: 2, bgcolor: 'grey.300' }}>
                                {/* Thay thế bằng ảnh user nếu có, nếu không dùng icon */}
                                <AccountCircleIcon sx={{ fontSize: 100, color: 'text.secondary' }} />
                            </Avatar>
                            <Button size="small" variant="outlined" disabled={!isEditing}>
                                View/Thay đổi ảnh
                            </Button>
                        </Grid>
                        
                        {/* 4. Chỉnh sửa tên, ngày sinh, giới tính, số điện thoại, Giới thiệu */}
                        <Grid item xs={12} md={8}>
                            {isEditing ? (
                                <Box>
                                    <Typography variant="h6" gutterBottom>Chỉnh sửa thông tin</Typography>
                                    <EditField label="Name" name="username" value={formData.username} onChange={handleChange} />
                                    <EditField label="Ngày sinh (生年月日)" name="dob" value={formData.dob ? formData.dob.split('T')[0] : ''} onChange={handleChange} type="date" />
                                    <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                                        <InputLabel>Giới tính (セックス)</InputLabel>
                                        <Select
                                            label="Giới tính (セックス)"
                                            name="gender"
                                            value={formData.gender || ''}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="Nam">Nam (男性)</MenuItem>
                                            <MenuItem value="Nữ">Nữ (女性)</MenuItem>

                                        </Select>
                                    </FormControl>
                                    <EditField label="Điện thoại (電話番号)" name="phone" value={formData.phone} onChange={handleChange} type="tel" />
                                    <EditField 
                                        label="Giới thiệu bản thân (自己紹介)" 
                                        name="introduction" 
                                        value={formData.introduction}
                                        onChange={handleChange}
                                        multiline 
                                    />
                                </Box>
                            ) : (
                                <Box>
                                    <Typography variant="h5" component="h1" gutterBottom>
                                        {user.username}
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <DataField label="Email" value={user.email} />
                                    <DataField label="Ngày sinh" value={formatDateToDDMMYYYY(user.dob)} />
                                    <DataField label="Giới tính" value={user.gender} />
                                    <DataField label="Điện thoại" value={user.phone} />
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                            Giới thiệu bản thân:
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {user.introduction || 'Chưa có thông tin giới thiệu.'}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* 5. Khu vực mua hàng (Mua sắm) - Giữ nguyên Layout */}
            <Card sx={{ boxShadow: 3, borderRadius: 2, mt: 3, p: 4 }}>
                <Typography variant="h6" gutterBottom>
                    購入 (Mua sắm)
                </Typography>
                <Box sx={{ height: 150, border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="text.secondary">Danh sách sản phẩm đã mua sẽ hiện ở đây.</Typography>
                </Box>
            </Card>

            {/* 6, 7. Khu vực cố định ở cuối trang (Edit/Save/Close) */}
            <Box sx={{ position: 'sticky', bottom: 0, mt: 3, p: 2, backgroundColor: 'white', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                
                {isEditing ? (
                    <>
                        {/* Nút 6. Save (Lưu) */}
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleSave} 
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                            disabled={loading}
                        >
                            {loading ? 'Đang lưu...' : 'Lưu (Save)'}
                        </Button>
                        {/* Nút 7. Close (Hủy) */}
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            onClick={handleCancel} 
                            startIcon={<CancelIcon />}
                            disabled={loading}
                        >
                            Hủy (Cancel)
                        </Button>
                    </>
                ) : (
                    <>
                        {/* Nút Edit (Chuyển sang chế độ chỉnh sửa) */}
                        <Button 
                            variant="contained" 
                            color="info" 
                            onClick={() => setIsEditing(true)} 
                            startIcon={<EditIcon />}
                        >
                            Chỉnh sửa (Edit)
                        </Button>
                        {/* Nút Đăng xuất */}
                        <Button 
                            variant="contained" 
                            color="error" 
                            onClick={logout} 
                            startIcon={<LogoutIcon />}
                        >
                            Đăng xuất
                        </Button>
                    </>
                )}
            </Box>
            

        </Container>
    );
};

export default Profile;