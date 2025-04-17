const express = require('express');
const { registerUser, loginUser, lihatInformasiPribadi, editInformasiPribadi, getInisialUser } = require('../controllers/userController');
const User = require('../models/User');

const router = express.Router();

// 🟢 ROUTE USER

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/user/:id', lihatInformasiPribadi);

router.put('/user/:id', editInformasiPribadi);

router.get('/inisial/:id', getInisialUser);

// 🟢 ROUTE ADMIN

module.exports = router;
