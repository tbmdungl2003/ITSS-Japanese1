import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
    Container, 
    Box, 
    Typography, 
    CircularProgress, 
    Alert, 
    Grid, 
    Card, 
    CardMedia, 
    CardContent,
    Button,
    Tabs,
    Tab  
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getFoodById } from '../api/api';
import CommentSection from '../components/CommentSection'; // Import component mới

// Component trợ giúp để hiển thị nội dung của từng tab
function TabPanel(props) {
    const { children, value, index, ...other } = props;
 
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`food-details-tabpanel-${index}`}
        aria-labelledby={`food-details-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>{children}</Box>
        )}
      </div>
    );
}

const FoodDetails = () => {
    const { id } = useParams(); 
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tabValue, setTabValue] = useState(0); 
    
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        // Cuộn lên đầu trang khi component được tải
        window.scrollTo(0, 0);

        const fetchFoodDetails = async () => {
            try {
                setLoading(true);
                const response = await getFoodById(id);
                setFood(response.data);
                setError(null);
            } catch (err) {
                setError('Không thể tải thông tin chi tiết món ăn. Vui lòng thử lại.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodDetails();
    }, [id]); 

    if (loading) {
        return (
            <Container sx={{ py: 4, textAlign: 'center' }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Đang tải chi tiết món ăn...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
                <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
                    Quay về trang chủ
                </Button>
            </Container>
        );
    }

    if (!food) {
        return null; 
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
                Quay lại danh sách
            </Button>
            <Card sx={{ boxShadow: 3 }}>
                <Grid container>
                    {/* Cột ảnh */}
                    <Grid item xs={12} md={6}>
                        <CardMedia
                            component="img"
                            image={food.image || 'https://via.placeholder.com/600x400.png?text=Foody88'} // Ảnh mặc định
                            alt={food.name}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Grid>
                    {/* Cột thông tin */}
                    <Grid item xs={12} md={6}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                {food.name}
                            </Typography>
                            <Typography variant="h6" color="primary.main" gutterBottom>
                                {food.price || 'Đang cập nhật giá'}
                            </Typography>
                            
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>

            {/* Khu vực Tabs cho Chi tiết và Bình luận */}
            <Box sx={{ width: '100%', mt: 3, border: '1px solid #ddd', borderRadius: 2, bgcolor: 'background.paper' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="food details tabs">
                        <Tab label="Chi tiết món ăn" id="food-details-tab-0" />
                        <Tab label={`Bình luận (${food.comments?.length || 0})`} id="food-details-tab-1" />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <Typography variant="h6" gutterBottom>Mô tả</Typography>
                    <Typography paragraph>{food.description || 'Chưa có mô tả cho món ăn này.'}</Typography>
                    <Typography variant="h6" gutterBottom sx={{mt: 2}}>Địa chỉ</Typography>
                    <Typography>{food.address || 'Chưa có thông tin địa chỉ.'}</Typography>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <CommentSection comments={food.comments} foodId={id} /> 
                </TabPanel>
            </Box>
        </Container>
    );
};

export default FoodDetails;