import React from 'react';
import {
    Box, Container, Typography, Paper, Grid, Link, Avatar, TextField, Button,
    FormControl, InputLabel, Select, MenuItem, Alert, IconButton
} from '@mui/material';
import { Mail, MapPin, Phone, Briefcase, Instagram, Facebook } from 'lucide-react';

const redBrown = '#B33A3A';

const ContactItem = ({ icon: Icon, title, content, href }) => (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, borderRadius: 2, '&:hover': { bgcolor: 'action.hover' } }}>
        <Avatar sx={{ bgcolor: redBrown, color: 'white' }}>
            <Icon size={20} color="white" />
        </Avatar>
        <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {title}
            </Typography>
            <Link 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                underline="hover"
                sx={{ 
                    color: '#555', 
                    textDecorationColor: '#555',
                    fontSize: '0.9rem' 
                }}
            >
                {content}
            </Link>
        </Box>
    </Box>
);

const Contact = () => {
    const [statusMessage, setStatusMessage] = React.useState('');
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        topic: '',
        message: ''
    });
    const [errors, setErrors] = React.useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Thêm logic kiểm tra lỗi ngay khi người dùng gõ
        if (name === 'email') {

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value)) {
                setErrors(prev => ({ ...prev, email: "Vui lòng nhập một địa chỉ email hợp lệ." }));
            } else {
                // Nếu email hợp lệ, xóa lỗi đi
                const { email, ...restErrors } = errors;
                setErrors(restErrors);
            }
        }
    };

    const validate = () => {
        const tempErrors = {};
        // Sử dụng regex mạnh hơn để kiểm tra định dạng email chuẩn
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            tempErrors.email = "Vui lòng nhập một địa chỉ email hợp lệ.";
        }
        if (!formData.name) {
            tempErrors.name = "Vui lòng nhập họ và tên.";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setStatusMessage('Cảm ơn bạn đã gửi tin nhắn! Foody88 sẽ phản hồi trong 24 giờ.');
            e.target.reset();
            setTimeout(() => setStatusMessage(''), 5000);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', p: { xs: 2, sm: 4 } }}>
            <Container maxWidth="xl">
                {/* Header Section */}
                <Box sx={{
                    bgcolor: redBrown,
                    color: 'white',
                    py: 8,
                    borderRadius: 5,
                    boxShadow: 6,
                    mb: 6,
                    textAlign: 'center'
                }}>
                    <Mail size={64} style={{ margin: 'auto', marginBottom: '16px' }} />
                    <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>Liên Hệ Với Foody88</Typography>
                    <Typography variant="h6" sx={{ fontStyle: 'italic', opacity: 0.9 }}>Chúng tôi luôn sẵn sàng lắng nghe bạn!</Typography>
                </Box>

                <Grid container spacing={4} alignItems="flex-start">
                    
                    {/* Cột 1: Form "Gửi Tin Nhắn" (chiếm 70%) */}
                    <Grid item xs={12} md={8.4}>
                        <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: redBrown }}>
                                Gửi Tin Nhắn Cho Chúng Tôi
                            </Typography>
                            
                            {statusMessage && <Alert severity="success" sx={{ mb: 2 }}>{statusMessage}</Alert>}

                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField 
                                            label="Họ và Tên (*)" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            fullWidth 
                                            required
                                            error={!!errors.name}
                                            helperText={errors.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            label="Địa chỉ Email (*)" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email" 
                                            fullWidth 
                                            required 
                                            error={!!errors.email}
                                            helperText={errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth required>
                                            <InputLabel>Chọn Chủ đề (*)</InputLabel>
                                            <Select label="Chọn Chủ đề (*)" name="topic" value={formData.topic} onChange={handleChange}>
                                                {/* MenuItem value="" disabled không hoạt động tốt với label nổi, nên bỏ đi */}
                                                <MenuItem value="feedback">Phản hồi Công thức</MenuItem>
                                                <MenuItem value="partnership">Hợp tác/Truyền thông</MenuItem>
                                                <MenuItem value="technical">Hỗ trợ Kỹ thuật</MenuItem>
                                                <MenuItem value="general">Câu hỏi chung</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            label="Nội dung Tin nhắn (*)" 
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            multiline rows={5} 
                                            fullWidth required 
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.5, fontWeight: 'bold', borderRadius: '50px', bgcolor: redBrown, '&:hover': { bgcolor: '#9e3131' } }}>
                                            Gửi Tin Nhắn
                                        </Button>
                                        <Typography variant="caption" display="block" textAlign="center" sx={{ mt: 1 }}>
                                            Chúng tôi phản hồi trong 24-48 giờ làm việc.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>

                    {/* Cột 2: Thông tin chi tiết và Social (chiếm 30%) */}
                    <Grid item xs={12} md={3.6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Paper elevation={4} sx={{ p: 2, borderRadius: 4 }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: redBrown, borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                                    Thông Tin Chi Tiết
                                </Typography>
                                <ContactItem icon={MapPin} title="Địa chỉ Văn phòng" content="Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội" href="https://www.google.com/maps/place/Hanoi+University+of+Science+and+Technology" />
                                <ContactItem icon={Mail} title="Email Hỗ trợ" content="support@foody88.com" href="mailto:support@foody88.com" />
                                <ContactItem icon={Briefcase} title="Hợp tác/PR" content="partner@foody88.com" href="mailto:partner@foody88.com" />
                                <ContactItem icon={Phone} title="Đường dây nóng" content="(+84) 901 888 888" href="tel:+84901888888" />
                            </Paper>

                            <Paper elevation={4} sx={{ p: 3, borderRadius: 4 }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: redBrown }}>
                                    Theo Dõi Foody88
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    Kết nối ngay để xem các món ăn mới nhất và cập nhật tin tức ẩm thực hàng ngày.
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <IconButton component="a" href="#" target="_blank" sx={{ bgcolor: '#1877F2', color: 'white', '&:hover': { bgcolor: '#166fe5' } }}>
                                        <Facebook size={20} />
                                    </IconButton>
                                    <IconButton component="a" href="#" target="_blank" sx={{ background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', color: 'white' }}>
                                        <Instagram size={20} />
                                    </IconButton>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};

export default Contact;