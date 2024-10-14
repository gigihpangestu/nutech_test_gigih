const db = require('../config/db');

const User = {
  register: (email, password, first_name, last_name) => {
    const query = 'INSERT INTO tb_users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(query, [email, password, first_name, last_name], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  login: (email, password) => {
    const query = 'SELECT * FROM tb_users WHERE email = ? AND password = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [ email, password ], (err, result) => {
        if (err) {
          reject(err);
        } else if (result.length > 0) {
          resolve(result[0]); // Jika ditemukan user, return user
        } else {
          resolve(null); // Jika user tidak ditemukan
        }
      });
    });
  },

};

module.exports = User;