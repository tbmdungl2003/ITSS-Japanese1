const FOOD_DATA_BY_LOCATION = {
    "Ha Noi": {
        id: 1,
        // 🛑 THỐNG NHẤT: Dùng 'label' thay vì 'name'
        label: "Hà Nội", 
        items: [
            {
                id: 1,
                name: 'Phở Bò Hà Nội',
                price: '50.000 VNĐ',
                description: 'Phở là một món ăn truyền thống...',
                address: '49 Bát Đàn, Hoàn Kiếm, Hà Nội',
                image: 'https://i.ytimg.com/vi/71qA4h-h-aE/maxresdefault.jpg',
                comments: 'Aさん',
                date: '30 August 2018'
            },
            {
                id: 2,
                name: 'Bún Chả',
                price: '45.000 VNĐ',
                description: 'Bún chả là món ăn với bún, chả thịt lợn nướng...',
                address: 'Số 1 Hàng Mành, Hoàn Kiếm, Hà Nội',
                image: 'https://cdn.tgdd.vn/2021/08/CookProduct/1-1200x676-40.jpg',
                comments: 'Bさん',
                date: '30 August 2018'
            },
            {
                id: 3,
                name: 'Bánh Mì Phố Cổ',
                price: '30.000 VNĐ',
                description: 'Bánh mì giòn rụm kẹp với pate, thịt nướng...',
                address: '25 Hàng Cá, Hoàn Kiếm, Hà Nội',
                image: 'https://static.vinwonders.com/production/banh-mi-pho-co-ha-noi-1.jpg',
                comments: 'Cさん',
                date: '30 August 2018'
            }
        ]
    },
    "Da Nang": {
        id: 2,
        label: "Đà Nẵng",
        items: [
            // Các món ăn trong Đà Nẵng (đã hợp nhất)
            {
                id: 4,
                name: 'Mì Quảng',
                price: '35.000 VNĐ',
                description: 'Mì Quảng là món ăn đặc sản của Đà Nẵng và Quảng Nam...',
                address: '1A Hải Phòng, Hải Châu, Đà Nẵng',
                image: 'https://static.vinwonders.com/production/mi-quang-da-nang-1.jpg',
                comments: 'Dさん',
                date: '01 September 2018'
            },
            {
                id: 5,
                name: 'Bánh tráng cuốn thịt heo',
                price: '80.000 VNĐ',
                description: 'Thịt heo được luộc hoặc quay giòn bì...',
                address: 'Quán Mậu, 35 Đỗ Thúc Tịnh, Cẩm Lệ, Đà Nẵng',
                image: 'https://cdn.tgdd.vn/2021/03/CookRecipe/GalleryStep/thanh-pham-1495.jpg',
                comments: 'Eさん',
                date: '02 September 2018'
            }
        ]
    },
    "Ho Chi Minh": {
        id: 3,
        label: "TP. Hồ Chí Minh",
        items: [
            // Các món ăn trong TP.HCM (đã hợp nhất)
            {
                id: 6,
                name: 'Cơm Tấm Sài Gòn',
                price: '40.000 VNĐ',
                description: 'Cơm tấm là món ăn phổ biến ở Sài Gòn...',
                address: 'Cơm tấm Ba Ghiền, 84 Đặng Văn Ngữ, Phú Nhuận, TP.HCM',
                image: 'https://stc.shopiness.vn/deal/2019/10/08/a/8/9/d/1570505962298_540.png',
                comments: 'Fさん',
                date: '05 September 2018'
            },
            {
                id: 7,
                name: 'Hủ Tiếu Nam Vang',
                price: '55.000 VNĐ',
                description: 'Hủ tiếu Nam Vang có nguồn gốc từ Campuchia...',
                address: 'Hủ tiếu Nhân Quán, 72 Nguyễn Thượng Hiền, Quận 3, TP.HCM',
                image: 'https://cdn.tgdd.vn/2021/03/CookProduct/Hutiunamvang-1200x676.jpg',
                comments: 'Gさん',
                date: '06 September 2018'
            }
        ]
    },
    'Hue': {
        id: 4,
        label: 'Huế',
        items: [
            { id: 17, name: 'Bún Bò Huế (Gốc)', comments: 'Qさん', date: '01 Apr 2023' },
            { id: 18, name: 'Bánh Bèo', comments: 'Rさん', date: '05 Apr 2023' },
            { id: 19, name: 'Bánh Nậm', comments: 'Sさん', date: '10 Apr 2023' },
            { id: 20, name: 'Chè Hẻm', comments: 'Tさん', date: '15 Apr 2023' },
        ]
    }
};

module.exports = FOOD_DATA_BY_LOCATION;