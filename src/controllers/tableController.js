const { readData, writeData } = require('../utils/fileHandler');

// 1. Tüm masaları listele
const getAllTables = (req, res) => {
    const db = readData();
    res.json({
        success: true,
        count: db.tables.length,
        data: db.tables
    });
};

// 2. Belirli bir masanın detayını getir
const getTableById = (req, res) => {
    const db = readData();
    const tableId = parseInt(req.params.id);
    const table = db.tables.find(t => t.id === tableId);

    if (!table) {
        return res.status(404).json({ success: false, message: "Masa bulunamadı!" });
    }

    res.json({ success: true, data: table });
};

// 3. Yeni masa ekle
const createTable = (req, res) => {
    const db = readData();
    const { tableNumber, capacity, status } = req.body;

    if (!tableNumber || !capacity) {
        return res.status(400).json({ success: false, message: "tableNumber ve capacity alanları zorunludur!" });
    }

    const newTable = {
        id: db.tables.length > 0 ? db.tables[db.tables.length - 1].id + 1 : 1,
        tableNumber: parseInt(tableNumber),
        capacity: parseInt(capacity),
        status: status || "empty"
    };

    db.tables.push(newTable);
    writeData(db);

    res.status(201).json({ success: true, message: "Masa başarıyla eklendi.", data: newTable });
};

// 4. Masa güncelle
const updateTable = (req, res) => {
    const db = readData();
    const tableId = parseInt(req.params.id);
    const tableIndex = db.tables.findIndex(t => t.id === tableId);

    if (tableIndex === -1) {
        return res.status(404).json({ success: false, message: "Masa bulunamadı!" });
    }

    const { tableNumber, capacity, status } = req.body;

    db.tables[tableIndex] = {
        ...db.tables[tableIndex],
        tableNumber: tableNumber ? parseInt(tableNumber) : db.tables[tableIndex].tableNumber,
        capacity: capacity ? parseInt(capacity) : db.tables[tableIndex].capacity,
        status: status || db.tables[tableIndex].status
    };

    writeData(db);
    res.json({ success: true, message: "Masa güncellendi.", data: db.tables[tableIndex] });
};

// 5. Masa sil
const deleteTable = (req, res) => {
    const db = readData();
    const tableId = parseInt(req.params.id);
    const tableIndex = db.tables.findIndex(t => t.id === tableId);

    if (tableIndex === -1) {
        return res.status(404).json({ success: false, message: "Masa bulunamadı!" });
    }

    const deletedTable = db.tables.splice(tableIndex, 1);
    writeData(db);

    res.json({ success: true, message: "Masa silindi.", data: deletedTable[0] });
};

// 6. Masa hesabı kapat ve boşalt (Reset)
const resetTable = (req, res) => {
    const db = readData();
    const tableId = parseInt(req.params.id);
    const tableIndex = db.tables.findIndex(t => t.id === tableId);

    if (tableIndex === -1) {
        return res.status(404).json({ success: false, message: "Masa bulunamadı!" });
    }

    // Masayı boş olarak işaretle
    db.tables[tableIndex].status = "empty";

    // İsteğe bağlı: Bu masaya ait aktif sipariş varsa onları da "completed" yapabilirsin.(tamamlanabilir otomati Kapatır.)
    if (db.orders) {
        db.orders.forEach(order => {
            if (order.tableId === tableId && order.status !== "completed") {
                order.status = "completed";
            }
        });
    }

    writeData(db);
    res.json({ success: true, message: "Masa hesabı kapatıldı ve masa boşaltıldı.", data: db.tables[tableIndex] });
};

module.exports = {
    getAllTables,
    getTableById,
    createTable,
    updateTable,
    deleteTable,
    resetTable
};