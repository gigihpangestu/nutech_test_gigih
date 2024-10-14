// controllers/balanceController.js
const balanceModel = require('../models/balanceModel');

const checkBalance = (req, res) => {
    const email = req.email; // Ambil email dari request yang sudah didekode

    balanceModel.getBalanceByEmail(email, (err, balance) => {
        if (err) return res.status(500).json({ message: 'Internal server error' });
        if (!balance) return res.status(404).json({ message: 'Balance not found' });

        res.status(200).json({status: 108, message: "Get Balance Berhasil", data:{balance: balance.balance} });
    });
};

module.exports = { checkBalance };
