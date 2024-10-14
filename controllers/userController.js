const User = require('../models/userModel');
const jwt  = require('jsonwebtoken');


// fungsi register
const register = async (req, res) => {
  const { email, password, first_name, last_name} = req.body;

  // Validasi format email dan panjang password
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      status: 102, 
      message: 'Parameter email tidak sesuai format', 
      data: null });
  }

  if (password.length < 8) {
    return res.status(400).json({ 
      status: 102, 
      message: 'Password minimal 8 karakter', 
      data: null });
  }

  try {
    const result = await User.register( email, password, first_name, last_name);
    res.status(200).json({
      status : 0, message: 'Registrasi berhasil silahkan login', data: null });
  } catch (error) {
    res.status(400).json({ 
      status: 102, message: 'Parameter email tidak sesuai format', data: null});
  }
};


// Fungsi login
const JWT_SECRET = process.env.JWT_SECRET;
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: 102,
      message: 'parameter email tidak sesuai format',
      data: null,
    });
  }

  // Validasi panjang password
  if (password.length < 8) {
    return res.status(400).json({
      status: 103,
      message: 'Password must be at least 8 characters',
      data: null,
    });
  }

  try {
    // Coba login dengan email dan password
    const user = await User.login(email, password);

    if (user) {
      // Jika login berhasil
      const token = jwt.sign(
        { email: user.email }, // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: '12h' } // Set expiration 12 jam
      );

      res.status(200).json({
        status: 0,
        message: 'Login berhasil',
        data: {
          token: token
        },
      });
    } else {
      // Jika login gagal
      res.status(401).json({
        status: 103,
        message: 'Username atau password salah',
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Error during login',
      data: null,
    });
  }
};

module.exports = { register, login };