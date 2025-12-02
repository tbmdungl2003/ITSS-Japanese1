const STORE_DATA=require('../data/storeData.js')
const getStoreInformation=async(req,res)=>{
    const allStores = Object.values(STORE_DATA).flatMap(province => province.items);
    res.json(allStores);
}

const getStoreById = async (req, res) => {
    const { id } = req.params;
    // Tìm kiếm cửa hàng trong tất cả các tỉnh
    const allStores = Object.values(STORE_DATA).flatMap(province => province.items);
    const store = allStores.find(s => s.id === id);
    
    if (store) {
        res.json(store);
    } else {
        res.status(404).json({ message: "Store not found" });
    }
};
module.exports={getStoreInformation, getStoreById}