const db = require('../config/db');

// Fungsi untuk menambahkan transaksi
const createTransaction = (invoice_number, service_code, service_name, total_amount, callback) => {
    const sql = `
        INSERT INTO tb_transaction (invoice_number, service_code, service_name, transaction_type, total_amount)
        VALUES (?, ?, ?, 'PAYMENT', ?)
    `;
    db.query(sql, [invoice_number, service_code, service_name, total_amount], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Fungsi untuk mendapatkan layanan berdasarkan kode
const getServiceByCode = (service_code, callback) => {
    const sql = 'SELECT * FROM tb_services WHERE service_code = ?';
    db.query(sql, [service_code], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results[0]); // Mengembalikan layanan pertama
    });
};

module.exports = { createTransaction, getServiceByCode };
