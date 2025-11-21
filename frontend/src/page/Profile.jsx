import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateUserProfile } from '../api/api'; 
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
    Alert, 
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

const API_BASE_URL = 'http://localhost:5000'; // Giả sử backend chạy ở đây

// --- JSX Helpers ---
// Di chuyển ra ngoài để không bị tạo lại mỗi lần Profile render
const DataField = ({ label, value }) => (
    <Box sx={{ display: 'flex', mb: 1, alignItems: 'baseline' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', width: 150, flexShrink: 0 }}>
            {label}:
        </Typography>
        <Typography variant="body1" color="text.primary">
            {value || '---'}
        </Typography>
    </Box>
);

const EditField = ({ label, name, value, onChange, type = 'text', multiline = false }) => {
    const inputLabelProps = 
        type === 'date' 
        ? { shrink: true } // Buộc label co lại cho trường ngày tháng
        : {};

    return (
        <Box sx={{ mb: 2 }}>
            <TextField
                fullWidth
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                multiline={multiline}
                rows={multiline ? 3 : 1}
                size="small"
                InputLabelProps={inputLabelProps}
            />
        </Box>
    );
};

const Profile = () => {
    // Lấy token, user và hàm cập nhật từ AuthContext
    const { auth, setAuth, logout } = useContext(AuthContext); 
    
    // Khởi tạo state người dùng (đảm bảo user không null)
    const initialUser = auth.user || {}; 

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(initialUser);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // State để quản lý ảnh
    const [avatarFile, setAvatarFile] = useState(null); // Lưu file ảnh để gửi đi
    const [avatarPreview, setAvatarPreview] = useState(null); // Lưu URL tạm thời để xem trước
    
    const fileInputRef = useRef(null);

    // Đồng bộ dữ liệu khi chế độ xem thay đổi hoặc user trong context thay đổi
    useEffect(() => {
        setFormData(auth.user || {});
        // Xóa preview khi chuyển sang chế độ xem
        if (!isEditing) {
            setAvatarPreview(null); 
            setAvatarFile(null);
        }
    }, [auth.user, isEditing]);


    // ----------------------------------------------------
    // Logic Form và Actions
    // ----------------------------------------------------

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file); // Lưu file để gửi đi
            setAvatarPreview(URL.createObjectURL(file)); // Tạo URL để xem trước
        }
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);

        try {
            // Tạo một đối tượng mới để gửi đi
            const dataToSend = { ...formData };

            // Nếu có file ảnh mới, thêm vào đối tượng gửi đi
            if (avatarFile) {
                dataToSend.avatar = avatarFile;
            }

            // Gọi API một lần duy nhất với tất cả dữ liệu
            const response = await updateUserProfile(dataToSend);
            const updatedUser = response.data;

            // Cập nhật AuthContext
            setAuth(prevAuth => ({
                ...prevAuth,
                user: updatedUser, // Cập nhật user object
            }));

            // Thoát chế độ chỉnh sửa và reset state ảnh
            setIsEditing(false);
            setAvatarPreview(null);
            setAvatarFile(null);
            
        } catch (error) {
            console.error('Update failed:', error);
            setError(error.response?.data?.msg || error.message || "Lỗi lưu thông tin hồ sơ.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData(initialUser);
        setAvatarPreview(null);
        setAvatarFile(null);
        setIsEditing(false);
    };

    // Kiểm tra đăng nhập
    if (!auth.isAuthenticated || !auth.user) {
        return (
            <Container sx={{ py: 4 }}>
                <Typography variant="h5" align="center">
                    ユーザー情報が見つかりません。ログインしてください。
                    (Không tìm thấy thông tin người dùng. Vui lòng đăng nhập.)
                </Typography>
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 2, mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                プロファイル (Profile)
            </Typography>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ p: 4 }}>
                    <Grid container spacing={4}>
                        
                        {/* 3. Ảnh/View đổi hồ sơ */}
                        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                            <Avatar 
                                // Hiển thị ảnh xem trước (nếu có), ảnh avatar đã lưu, hoặc icon mặc định
                                src={avatarPreview || (formData.avatar ? `${API_BASE_URL}${formData.avatar}` : '')}
                                sx={{ width: 160, height: 160, margin: 'auto', mb: 2, bgcolor: 'grey.300' }}
                            >
                                <AccountCircleIcon sx={{ fontSize: 100, color: 'text.secondary' }} />
                            </Avatar>
                            
                            {/* Input file ẩn */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="avatar-upload-input"
                            />
                            
                            {/* Nút bấm để kích hoạt Input file */}
                            <Button 
                                size="small" 
                                variant="outlined" 
                                disabled={!isEditing}
                                onClick={() => fileInputRef.current.click()}
                            >
                                写真を変更 (Đổi ảnh)
                            </Button>
                        </Grid>
                        
                        {/* 4. Thông tin và Chỉnh sửa */}
                        <Grid item xs={12} md={8}>
                            {isEditing ? (
                                <Box>
                                    <Typography variant="h6" gutterBottom>情報編集</Typography>                                    
                                    <EditField label="名前" name="username" value={formData.username || ''} onChange={handleChange} />
                                    <EditField label="生年月日" name="dob" value={formData.dob ? formData.dob.split('T')[0] : ''} type="date" onChange={handleChange} />
                                    <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                                        <InputLabel>性別</InputLabel>
                                        <Select
                                            label="性別"
                                            name="gender"
                                            value={formData.gender || ''}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="Nam">Nam (男性)</MenuItem>
                                            <MenuItem value="Nữ">Nữ (女性)</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <EditField label="電話番号" name="phone" value={formData.phone || ''} type="tel" onChange={handleChange} />
                                    <EditField 
                                        label="自己紹介" 
                                        name="introduction" 
                                        value={formData.introduction || ''} 
                                        onChange={handleChange}
                                        multiline 
                                    />
                                </Box>
                            ) : (
                                <Box>
                                    <Typography variant="h5" component="h1" gutterBottom>
                                        {formData.username}
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <DataField label="メール" value={formData.email} />
                                    <DataField label="生年月日" value={formData.dob ? new Date(formData.dob).toLocaleDateString('vi-VN') : '---'} />
                                    <DataField label="性別" value={formData.gender} />
                                    <DataField label="電話番号" value={formData.phone} />
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                            自己紹介:
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                                            {formData.introduction || '紹介情報がありません。'}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* 5. Khu vực mua hàng (Mua sắm) */}
            <Card sx={{ boxShadow: 3, borderRadius: 2, mt: 3, p: 4 }}>
                <Typography variant="h6" gutterBottom>
                    購入履歴 (Lịch sử mua hàng)
                </Typography>
                <Box sx={{ height: 150, border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="text.secondary">購入した商品リストはここに表示されます。</Typography>
                </Box>
            </Card>

            {/* 6, 7. Khu vực cố định ở cuối trang (Edit/Save/Close) */}
            <Box sx={{ 
                position: 'sticky', 
                bottom: 0, 
                mt: 3, 
                p: 2, 
                backgroundColor: 'white', 
                borderTop: '1px solid #eee', 
                display: 'flex', 
                justifyContent: 'flex-end', 
                gap: 2,
                zIndex: 100 // Đảm bảo nổi lên trên nội dung khác
            }}>
                
                {isEditing ? (
                    <>
                        {/* Nút 7. Close (Hủy) */}
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            onClick={handleCancel} 
                            startIcon={<CancelIcon />}
                            disabled={loading}
                        >
                            キャンセル
                        </Button>
                        {/* Nút 6. Save (Lưu) */}
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleSave} 
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                            disabled={loading}
                        >
                            {loading ? '保存中...' : '保存'}
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
                            編集
                        </Button>
                        {/* Nút Đăng xuất */}
                        <Button 
                            variant="contained" 
                            color="error" 
                            onClick={logout} 
                            startIcon={<LogoutIcon />}
                        >
                            ログアウト
                        </Button>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default Profile;