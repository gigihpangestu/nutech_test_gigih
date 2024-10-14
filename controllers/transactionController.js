// controllers/transactionController.js
const { v4: uuidv4 } = require('uuid'); // Import UUID
const transactionModel = require('../models/transactionModel');

const createTransaction = (req, res) => {
    const invoice_number = uuidv4(); // Generate invoice_number menggunakan UUID
    const service_code = "PLN_PRABAYAR"; // Ambil service_code dari header
    const total_amount = "10000"; // Ambil total_amount dari header

    // Validasi total_amount
    if (!total_amount || total_amount <= 0) {
        return res.status(400).json({ message: 'HARUS LEBIH DARI 0' });
    }

    // Ambil service berdasarkan service_code
    transactionModel.getServiceByCode(service_code, (err, service_code) => {
        if (err) return res.status(500).json({ message: 'Internal server error' });
        if (!service_code) return res.status(400).json({status : 102, message: 'Service not found', data : null });

        // Ambil service_name dari hasil query
        console.log(err);
        const service_name = service.service_name;

        // Simpan transaksi ke tb_transaction
        transactionModel.createTransaction(invoice_number, service_code, service_name, total_amount, (err) => {
            if (err) return res.status(500).json({ message: 'Internal server error' });

            res.status(200).json({
                status : 0,
                message: 'TRANSAKSI BERHASIL',
                data : {
                invoice_number: invoice_number,
                service_code: service_code,
                service_name: service_name,
                transaction_type: transaction_type,
                total_amount: total_amount.total_amount,
                created_on: created_on // Tanggal saat transaksi dibuat
                }
            });
        });
    });
};

module.exports = { createTransaction };
