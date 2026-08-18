const { readData, writeData } = require('../utils/fileHandler');

// 1. Tüm ürünleri listele (İsteğe bağlı kategori filtresi ile)
const getAllProducts = (req, res) => {
    const db = readData();
    let products = db.products;

    // Örn: /api/products?categoryId=1
    const { categoryId } = req.query;
    if (categoryId) {
        products = products.filter(p => p.categoryId === parseInt(categoryId));
    }

    res.json({
        success: true,
        count: products.length,
        data: products
    });
};

// 2. Belirli bir ürünün detayı
const getProductById = (req, res) => {
    const db = readData();
    const productId = parseInt(req.params.id);
    const product = db.products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ success: false, message: "Ürün bulunamadı!" });
    }

    res.json({ success: true, data: product });
};

// 3. Yeni ürün ekle
const createProduct = (req, res) => {
    const db = readData();

    // 👉 GÖVDE (BODY) KONTROLÜ BURAYA EKLENECEK:
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, message: "Gövde (Body) kısmı boş bırakılamaz!" });
    }

    const { name, price, categoryId, isAvailable } = req.body;

    if (!name || !price || !categoryId) {
        return res.status(400).json({ success: false, message: "name, price ve categoryId alanları zorunludur!" });
    }

    const newProduct = {
        id: db.products.length > 0 ? db.products[db.products.length - 1].id + 1 : 1,
        name,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        isAvailable: isAvailable !== undefined ? isAvailable : true
    };

    db.products.push(newProduct);
    writeData(db);

    res.status(201).json({ success: true, message: "Ürün başarıyla eklendi.", data: newProduct });
};

// 4. Ürün güncelle
const updateProduct = (req, res) => {
    const db = readData();
    const productId = parseInt(req.params.id);
    const productIndex = db.products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ success: false, message: "Ürün bulunamadı!" });
    }

    const { name, price, categoryId, isAvailable } = req.body;

    db.products[productIndex] = {
        ...db.products[productIndex],
        name: name || db.products[productIndex].name,
        price: price !== undefined ? parseFloat(price) : db.products[productIndex].price,
        categoryId: categoryId !== undefined ? parseInt(categoryId) : db.products[productIndex].categoryId,
        isAvailable: isAvailable !== undefined ? isAvailable : db.products[productIndex].isAvailable
    };

    writeData(db);

    res.json({ success: true, message: "Ürün güncellendi.", data: db.products[productIndex] });
};

// 5. Ürün sil
const deleteProduct = (req, res) => {
    const db = readData();
    const productId = parseInt(req.params.id);
    const productIndex = db.products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ success: false, message: "Ürün bulunamadı!" });
    }

    const deletedProduct = db.products.splice(productIndex, 1);
    writeData(db);

    res.json({ success: true, message: "Ürün silindi.", data: deletedProduct[0] });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};