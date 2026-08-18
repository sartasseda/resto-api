const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/db.json');

// Veriyi oku
const readData = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { tables: [], products: [], orders: [] };
    }
};

// Veriyi yaz
const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

module.exports = { readData, writeData };