const express = require('express');
const logger = require('./middlewares/logger');
const tableRoutes = require('./routes/tableRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = 3000;

// Middleware'ler
app.use(express.json());
app.use(logger);
app.use(express.static('public')); // <--- YENİ: public klasörünü tarayıcıya açıyoruz

// Rotalar
app.use('/api/tables', tableRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.json({ message: "RestoApi sistemine hoş geldiniz!" });
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});