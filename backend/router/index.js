const express = require('express');
const { registerUser, loginUser, lihatInformasiPribadi, editInformasiPribadi, lihatKtpCheckout, editKtpCheckout } = require('../controllers/userController');
const upload = require('../config/multer');
const User = require('../models/User');

const router = express.Router();

// 🟢 ROUTE USER

router.post('/register', upload.single('fotoKtp'), registerUser);

router.post('/login', loginUser);

router.get('/user/:id/fotoKtp', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.fotoKtp) {
            return res.status(404).json({ msg: 'Foto tidak ditemukan' });
        }

        res.set('Content-Type', 'image/jpeg');
        res.send(user.fotoKtp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.get('/user/:id', lihatInformasiPribadi);

router.put('/user/:id', editInformasiPribadi);

router.get('/user/:id/checkout', lihatKtpCheckout);

router.patch('/user/:id/ktp', upload.single('fotoKtp'), editKtpCheckout);

module.exports = router;
