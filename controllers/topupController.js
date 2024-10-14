// controllers/topupController.js
const balanceModel = require('../models/balanceModel');

const topUp = (req, res) => {
    const email = req.email; // Ambil email dari request yang sudah didekode
    const amount = "100000"; // Ambil amount dari query string

    // Validasi amount
    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'HARUS LEBIH DARI 0.' });
    }

    balanceModel.topUpBalance(email, amount, (err) => {
        console.log(err);
        if (err) return res.status(500).json({ message: 'Internal server error' });

        balanceModel.getBalanceByEmail(email, (err, balance) => {
            if (err) return res.status(500).json({ message: 'Internal server error' });

            res.status(200).json({
                status: 108,
                message: 'Top-up Balance Berhasil',
                data: {                
                balance: balance.balance
                } // Kembalikan saldo terbaru
            });
        });
    });
};

module.exports = { topUp };
