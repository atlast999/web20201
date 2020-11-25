const express = require('express')
const router = express.Router()

const productController = require('../controllers/ProductController')

//GET - product detail
router.get('/', productController.getDetail)

//GET - show cart
router.get('/cart', productController.showCart)

//GET - add to cart
router.get('/cart/addProduct/:productId', productController.addToCart)

//GET - show payment
router.get('/payment', productController.showPayment)

module.exports = router