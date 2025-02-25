const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🟢 REGISTER USER - POST
const registerUser = async (req, res) => {
    const { namaLengkap, email, password, confirmPassword, nomorTelepon, pekerjaan } = req.body;
    const fotoKtp = req.file ? req.file.buffer : null; // Simpan sebagai Buffer

    if (!namaLengkap || !email || !password || !confirmPassword) {
        return res.status(400).json({ msg: 'Harap isi semua data yang wajib' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ msg: 'Password tidak cocok' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Email sudah digunakan' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            namaLengkap,
            email,
            password: hashedPassword,
            nomorTelepon: nomorTelepon || null,
            pekerjaan: pekerjaan || null,
            fotoKtp: fotoKtp
        });

        await user.save();
        res.status(201).json({ msg: 'Registrasi berhasil', user });

    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// 🟢 LOGIN USER - POST
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Harap isi semua data' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Email tidak terdaftar' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Password salah' });
        }

        const token = jwt.sign(
            { id: user._id },
            'secretkey', // Ganti dengan variabel environment untuk keamanan
            { expiresIn: '1h' }
        );

        res.json({ msg: 'Login berhasil', token, user });

    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// 🟢 LIHAT INFORMASI PRIBADI - GET
const lihatInformasiPribadi = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('namaLengkap email nomorTelepon pekerjaan');
        
        if (!user) {
            return res.status(404).json({ msg: 'User tidak ditemukan' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// 🟢 EDIT INFORMASI PRIBADI - PUT
const editInformasiPribadi = async (req, res) => {
    try {
        const { namaLengkap, email, password, nomorTelepon, pekerjaan } = req.body;
        
        // Cari user berdasarkan ID
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User tidak ditemukan' });
        }

        // Update data jika ada input baru
        if (namaLengkap) user.namaLengkap = namaLengkap;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        if (nomorTelepon) user.nomorTelepon = nomorTelepon;
        if (pekerjaan) user.pekerjaan = pekerjaan;

        // Simpan perubahan ke database
        await user.save();

        res.status(200).json({ msg: 'Informasi berhasil diperbarui', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// 🟢 LIHAT KTP CHECKOUT - GET
const lihatKtpCheckout = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('namaLengkap nomorTelepon pekerjaan fotoKtp');

        if (!user) {
            return res.status(404).json({ msg: 'User tidak ditemukan' });
        }

        // Jika user ditemukan tetapi tidak memiliki foto KTP
        if (!user.fotoKtp) {
            return res.status(404).json({ msg: 'Foto KTP tidak ditemukan' });
        }

        // Mengembalikan data JSON + foto KTP dalam format base64
        res.status(200).json({
            namaLengkap: user.namaLengkap,
            nomorTelepon: user.nomorTelepon,
            pekerjaan: user.pekerjaan,
            fotoKtp: `data:image/jpeg;base64,${user.fotoKtp.toString('base64')}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// 🟢 EDIT KTP CHECKOUT - PATCH
const editKtpCheckout = async (req, res) => {
    try {
        // Cek apakah ada file yang diupload
        if (!req.file) {
            return res.status(400).json({ msg: 'Harap upload foto KTP baru' });
        }

        // Cari user berdasarkan ID
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User tidak ditemukan' });
        }

        // Update foto KTP dengan file yang diupload
        user.fotoKtp = req.file.buffer;
        await user.save();

        res.status(200).json({ msg: 'Foto KTP berhasil diperbarui' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, lihatInformasiPribadi, editInformasiPribadi, lihatKtpCheckout, editKtpCheckout };
