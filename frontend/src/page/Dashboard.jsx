import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, Typography, Container, Grid, Card, CardMedia, CardContent, 
  Link, CircularProgress, Alert, Avatar 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { getFoods, getStores } from '../api/api'; 
import SearchComponent from '../components/SearchComponent'; 

const Dashboard = () => {

    const [location, setLocation] = useState('all'); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [foodData, setFoodData] = useState({});
    const [stores, setStores] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [foodsRes, storesRes] = await Promise.all([getFoods(), getStores()]);
                setFoodData(foodsRes.data);
                setStores(storesRes.data);
                setError(null);
            } catch (err) {
                setError("Không thể tải dữ liệu.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []); 

    const displayedStores = useMemo(() => {
        if (!stores || stores.length === 0) {
            return [];
        }
        if (location === 'all') {
            return stores; 
        }

        const locationName = foodData[location]?.name;
        return locationName ? stores.filter(store => store.address && store.address.includes(locationName)) : stores;
    }, [stores, location, foodData]);

    const displayedItems = useMemo(() => {
        let itemsToDisplay = [];
        if (location === 'all') {
            itemsToDisplay = Object.values(foodData).flatMap(city => city?.items || []);
        } else {
            itemsToDisplay = foodData[location]?.items || [];
        }
        if (searchTerm.trim() !== '') {
            return itemsToDisplay.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return itemsToDisplay;
    }, [searchTerm, location, foodData]);

    const handleLocationChange = (newLocation) => {
        setLocation(newLocation);
        setSearchTerm(''); 
    };

    return (
        <Container component="main" maxWidth="xl" sx={{ py: 4, flexGrow: 1, backgroundColor: '#f5f5f5' }}>
            {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /><Typography sx={{ ml: 2 }}>Đang tải...</Typography></Box>}
            {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

            <SearchComponent 
                foodData={foodData} location={location} onLocationChange={handleLocationChange}
                searchTerm={searchTerm} onSearchChange={setSearchTerm}
            />

            {searchTerm && <Typography variant="h5" sx={{ mb: 3 }}>Kết quả cho: "{searchTerm}"</Typography>}

            <Box sx={{ height: 150, bgcolor: '#e0e0e0', mb: 5, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" color="text.secondary">Banner Quảng Cáo</Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', borderLeft: '5px solid #1976d2', pl: 2 }}>
                    おすすめのレストラン
                </Typography>
                <Grid container spacing={3}>
                    {displayedStores.slice(0, 4).map((store) => ( // Chỉ hiển thị 4 cửa hàng
                        <Grid item key={store.id} xs={12} sm={6} md={3}>
                            <Link component={RouterLink} to={`/store/${store.id}`} sx={{ textDecoration: 'none' }}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 'none', border: '1px solid #e0e0e0', borderRadius: 3, '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' }, transition: '0.3s' }}>
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={store.image || 'https://placehold.co/400x260?text=Store'}
                                        alt={store.name}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {store.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {store.address}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', borderLeft: '5px solid #ff0000', pl: 2 }}>
                    本日のおすすめ
                </Typography>
                <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}> 
                    {displayedItems.map((item) => (                                
                        <Grid item key={item._id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>                                              
                            <Card sx={{ 
                                width: '100%',       
                                height: '380px',    
                                display: 'flex', 
                                flexDirection: 'column', 
                                boxShadow: 'none',
                                border: '1px solid #e0e0e0',
                                borderRadius: 3,
                                overflow: 'hidden', 
                                transition: '0.3s',
                                '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' }
                            }}>
                                {/* Liên kết cho hình ảnh và thông tin chính */}
                                <Box component={RouterLink} to={`/details/${item._id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                    <CardMedia
                                        component="img"
                                        image={item.image && item.image !== "" ? item.image : 'https://placehold.co/600x400?text=No+Image'} 
                                        alt={item.name}
                                        sx={{
                                            width: '100%',      
                                            height: '220px',    
                                            objectFit: 'cover', 
                                            objectPosition: 'center',
                                            display: 'block'    
                                        }}
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src = 'https://placehold.co/600x400?text=Error+Image'
                                        }}
                                    />
                                    <CardContent sx={{ p: 2, pb: 0, bgcolor: '#fff' }}>
                                        <Typography variant="h6" component="div" 
                                            sx={{ 
                                                fontWeight: 'bold', fontSize: '1rem', lineHeight: 1.4, mb: 1,
                                                display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2,
                                                height: '2.8rem' 
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                        
                                        <Typography variant="body1" color="error" sx={{ fontWeight: 'bold' }}>
                                            {(item.price)}
                                        </Typography>
                                    </CardContent>
                                </Box>

                                {/* Vùng đệm để đẩy phần bình luận xuống dưới */}
                                <Box sx={{ flexGrow: 1, bgcolor: '#fff' }} /> 

                                {/* Liên kết cho phần bình luận */}
                                <Box 
                                    component={RouterLink} 
                                    to={`/details/${item._id}/comments`} 
                                    sx={{ 
                                        textDecoration: 'none', 
                                        color: 'inherit', 
                                        p: 2, 
                                        pt: 1,
                                        bgcolor: '#fff',
                                        borderTop: '1px solid #f0f0f0',
                                        '&:hover': { bgcolor: '#fafafa' }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar src={item.comments?.[0]?.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                                        <Typography variant="caption" color="text.secondary" noWrap>
                                            {item.comments && item.comments.length > 0 
                                                ? `${item.comments.length} bình luận` 
                                                : 'Chưa có bình luận'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard;