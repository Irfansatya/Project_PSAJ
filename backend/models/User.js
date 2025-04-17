const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    namaLengkap: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nomorTelepon: { type: String, default: null },
    pekerjaan: { type: String, default: null },
    alamat: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
