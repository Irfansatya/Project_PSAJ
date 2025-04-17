const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🟢 REGISTER USER - POST
const registerUser = async (req, res) => {
    const { namaDepan, namaAkhir, email, password, confirmPassword, nomorTelepon, pekerjaan, alamat } = req.body;

    // Validasi input
    if (!namaDepan || !namaAkhir || !email || !password || !confirmPassword) {
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

        // Gabungkan namaDepan dan namaAkhir menjadi namaLengkap
        const namaLengkap = `${namaDepan} ${namaAkhir}`;

        user = new User({
            namaLengkap,
            email,
            password: hashedPassword,
            nomorTelepon: nomorTelepon || null,
            pekerjaan: pekerjaan || null,
            alamat: alamat || null,
        });

        await user.save();
        res.status(201).json({ msg: 'Registrasi berhasil', user });

    } catch (error) {
        console.error(error);
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
            'secretkey',
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
        const user = await User.findById(req.params.id).select('namaLengkap email nomorTelepon pekerjaan alamat');
        
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
        const { namaLengkap, email, password, nomorTelepon, pekerjaan, alamat } = req.body;
        
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
        if (alamat) user.alamat = alamat;

        // Simpan perubahan ke database
        await user.save();

        res.status(200).json({ msg: 'Informasi berhasil diperbarui', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// 🟢 GET INISIAL USER BERDASARKAN ID - GET
const getInisialUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('namaLengkap');
        
        if (!user) {
            return res.status(404).json({ msg: 'User tidak ditemukan' });
        }

        // Ambil huruf pertama dari nama depan (diasumsikan nama depan adalah kata pertama dari namaLengkap)
        const namaDepan = user.namaLengkap.split(' ')[0];
        const inisial = namaDepan.charAt(0).toUpperCase();

        res.status(200).json({ inisial });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, lihatInformasiPribadi, editInformasiPribadi, getInisialUser };
