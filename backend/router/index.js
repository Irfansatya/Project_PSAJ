const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const orderController = require('../controllers/orderController')

// Route order
router.get('/order', orderController.index)
router.get('/order/:id', orderController.show)
router.post('/order', orderController.store)
router.delete('/order/:id', orderController.delete)

// Routes produk
router.get('/product', productController.index)
router.get('/product/:id', productController.show)
router.post('/product', productController.store)
router.put('/product/:id', productController.update)
router.delete('/product/:id', productController.delete)

module.exports = router