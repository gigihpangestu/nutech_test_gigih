const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');
const topupController = require('../controllers/topupController');
const transactionController = require('../controllers/transactionController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/balance', verifyToken, balanceController.checkBalance);

router.post('/topup', verifyToken, topupController.topUp);

router.post('/transaction', verifyToken, transactionController.createTransaction);

module.exports = router;
