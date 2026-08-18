const { readData, writeData } = require('../utils/fileHandler');

// 1. Tüm siparişleri listele
const getAllOrders = (req, res) => {
    const db = readData();
    let orders = db.orders;

    const { status } = req.query;
    if (status) {
        orders = orders.filter(o => o.status === status);
    }

    res.json({
        success: true,
        count: orders.length,
        data: orders
    });
};

// 2. Belirli bir siparişin detayı
const getOrderById = (req, res) => {
    const db = readData();
    const orderId = parseInt(req.params.id);
    const order = db.orders.find(o => o.id === orderId);

    if (!order) {
        return res.status(404).json({ success: false, message: "Sipariş bulunamadı!" });
    }

    res.json({ success: true, data: order });
};

// 3. Yeni sipariş oluştur
const createOrder = (req, res) => {
    const db = readData();
    const { tableId, items } = req.body;

    if (!tableId || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, message: "tableId ve items dizisi zorunludur!" });
    }

    const tableExists = db.tables.some(t => t.id === parseInt(tableId));
    if (!tableExists) {
        return res.status(404).json({ success: false, message: "Masa bulunamadı!" });
    }

    let totalAmount = 0;
    const validatedItems = [];

    for (let item of items) {
        const product = db.products.find(p => p.id === item.productId);
        if (!product) {
            return res.status(404).json({ success: false, message: `ID'si ${item.productId} olan ürün bulunamadı!` });
        }
        totalAmount += product.price * (item.quantity || 1);
        validatedItems.push({ productId: product.id, name: product.name, price: product.price, quantity: item.quantity || 1 });
    }

    const newOrder = {
        id: db.orders.length > 0 ? db.orders[db.orders.length - 1].id + 1 : 1,
        tableId: parseInt(tableId),
        items: validatedItems,
        totalAmount: totalAmount,
        status: "pending",
        createdAt: new Date().toISOString()
    };

    db.orders.push(newOrder);
    
    const tableIndex = db.tables.findIndex(t => t.id === parseInt(tableId));
    if (tableIndex !== -1) db.tables[tableIndex].status = "occupied";

    writeData(db);
    res.status(201).json({ success: true, message: "Sipariş oluşturuldu.", data: newOrder });
};

// 4. Sipariş durumunu güncelle (Tamamlandığında SİL)
const updateOrderStatus = (req, res) => {
    const db = readData();
    const orderId = parseInt(req.params.id);
    const orderIndex = db.orders.findIndex(o => o.id === orderId);

    if (orderIndex === -1) {
        return res.status(404).json({ success: false, message: "Sipariş bulunamadı!" });
    }

    const { status } = req.body;

    // Eğer "Tamamla" butonuna basıldıysa (status: 'completed') SİL
    if (status === 'completed') {
        const deletedOrder = db.orders.splice(orderIndex, 1);
        writeData(db);
        return res.json({ success: true, message: "Sipariş tamamlandı ve listeden silindi.", data: deletedOrder[0] });
    }

    // Değilse güncelle
    db.orders[orderIndex].status = status;
    writeData(db);

    res.json({ success: true, message: "Sipariş durumu güncellendi.", data: db.orders[orderIndex] });
};

// 5. Siparişi sil
const deleteOrder = (req, res) => {
    const db = readData();
    const orderId = parseInt(req.params.id);
    const orderIndex = db.orders.findIndex(o => o.id === orderId);

    if (orderIndex === -1) {
        return res.status(404).json({ success: false, message: "Sipariş bulunamadı!" });
    }

    const deletedOrder = db.orders.splice(orderIndex, 1);
    writeData(db);

    res.json({ success: true, message: "Sipariş silindi.", data: deletedOrder[0] });
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    deleteOrder
};