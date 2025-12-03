import React from 'react';
import { Box, Container, Typography, Paper, Grid, Avatar } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <InfoIcon color="primary" sx={{ fontSize: 60 }} />
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mt: 2 }}>
            紹介 (Về Chúng Tôi)
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
            Khám phá câu chuyện đằng sau Foody88
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, textAlign: 'justify', mb: 4 }}>
          Foody88 được sinh ra từ niềm đam mê ẩm thực và mong muốn kết nối những người yêu đồ ăn với những hương vị tuyệt vời nhất trên khắp Việt Nam. Chúng tôi tin rằng mỗi món ăn không chỉ là một bữa ăn, mà còn là một câu chuyện, một trải nghiệm văn hóa. Sứ mệnh của chúng tôi là xây dựng một cộng đồng nơi mọi người có thể dễ dàng tìm kiếm, chia sẻ và đánh giá những món ăn ngon, từ những quán ăn đường phố quen thuộc đến những nhà hàng sang trọng.
        </Typography>

        <Grid container spacing={4} sx={{ textAlign: 'center' }}>
          <Grid item xs={12} md={6}>
            <Box>
              <EmojiObjectsIcon color="secondary" sx={{ fontSize: 50, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Sứ Mệnh</Typography>
              <Typography>
                Mang đến một nền tảng đánh giá ẩm thực đáng tin cậy, giúp người dùng đưa ra lựa chọn tốt nhất và tôn vinh văn hóa ẩm thực Việt Nam.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <GroupIcon color="secondary" sx={{ fontSize: 50, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Đội Ngũ</Typography>
              <Typography>
                Chúng tôi là một nhóm các nhà phát triển và những người đam mê ẩm thực, cùng nhau làm việc để tạo ra những trải nghiệm tốt nhất cho bạn.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default About;