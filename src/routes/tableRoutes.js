const express = require('express');
const router = express.Router();
const {
    getAllTables,
    getTableById,
    createTable,
    updateTable,
    deleteTable,
    resetTable
} = require('../controllers/tableController');

router.get('/', getAllTables); // bütün tabloları getirir. 
router.get('/:id', getTableById);// ID si verilen bütün tabloları getirir.
router.post('/', createTable);//yeni tablo oluşturur. 
router.put('/:id', updateTable);//Tabloyu günceller.
router.delete('/:id', deleteTable);//Tabloyu siler. 
router.put('/:id/reset', resetTable); // /api/tables/:id/reset
module.exports = router;