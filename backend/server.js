const express = require('express');
const connectDB = require('./config/db');
const router = require('./router/index');

const app = express();

// 🟢 MIDDLEWARE
app.use(express.json());

// 🟢 KONEKSI DATABASE
connectDB();

// 🟢 ROUTES
app.use('/api', router);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));