const STORE_DATA = {
    hanoi: {
        name: "Hà Nội",
        items: [
            {
                id: "store_01",
                name: "Phở Gia Truyền Bát Đàn",
                address: "49 Bát Đàn, Hoàn Kiếm, Hà Nội",
                image: "https://images.unsplash.com/photo-1598214886304-607a1ba84e23?q=80&w=1920",
                open: "6:00 - 22:00",
                description: "Thương hiệu phở gia truyền nổi tiếng với hương vị nước dùng đậm đà và sợi phở mềm mại."
            },
            {
                id: "store_02",
                name: "Bún Chả Hàng Mành",
                address: "Số 1 Hàng Mành, Hoàn Kiếm, Hà Nội",
                image: "https://images.unsplash.com/photo-1627992256939-225880730385?q=80&w=1920",
                open: "10:00 - 21:00",
                description: "Quán bún chả lâu đời, nổi tiếng với chả nướng thơm lừng và nước chấm pha vừa miệng."
            }
        ]
    },
    danang: {
        name: "Đà Nẵng",
        items: [{
            id: "store_03",
            name: "Đặc sản Mì Quảng Đà Nẵng",
            address: "1A Hải Phòng, Hải Châu, Đà Nẵng",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1920",
            open: "7:00 - 22:30",
            description: "Tập hợp các món ăn đặc sản miền Trung trong một không gian kiến trúc cổ độc đáo."
        }]
    },
    hochiminh: {
        name: "TP. Hồ Chí Minh",
        items: [{
            id: "store_04",
            name: "Cơm Tấm Ba Ghiền",
            address: "84 Đặng Văn Ngữ, Phú Nhuận, TP.HCM",
            image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1920",
            open: "7:30 - 21:00",
            description: "Quán cơm tấm nổi tiếng với miếng sườn cốt lết to, nướng thấm vị và các món ăn kèm đa dạng."
        }]
    }
};

module.exports=STORE_DATA