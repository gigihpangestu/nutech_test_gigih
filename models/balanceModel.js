// models/userModel.js
const db = require('../config/db')

// Fungsi untuk mendapatkan pengguna berdasarkan email
const getUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM tb_users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results[0]); // Mengembalikan pengguna pertama
    });
};

// Fungsi untuk mendapatkan saldo pengguna berdasarkan email
const getBalanceByEmail = (email, callback) => {
    const sql = 'SELECT balance FROM tb_balances WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results[0]); // Mengembalikan saldo pengguna
    });
};

const topUpBalance = (email, amount, callback) => {
    // Menambahkan record ke tb_topup dengan transaction_type
    const sqlTopUp = 'INSERT INTO tb_topup (email, amount, transaction_type) VALUES (?, ?, ?)';
    const transactionType = 'topup'; // Jenis transaksi

    db.query(sqlTopUp, [email, amount, transactionType], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        // Mengupdate saldo di tb_balances
        const sqlUpdateBalance = 'UPDATE tb_balances SET balance = balance + ? WHERE email = ?';
        db.query(sqlUpdateBalance, [amount, email], (err) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    });
};



module.exports = { getUserByEmail, getBalanceByEmail, topUpBalance };
