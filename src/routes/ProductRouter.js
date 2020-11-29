const express = require('express')
const router = express.Router()

const productController = require('../controllers/ProductController')

//routes with slug must be at the end

//GET - show cart
router.get('/cart', productController.showCart)

//GET - show payment
router.get('/payment', productController.showPayment)

//GET - add to cart
router.get('/cart/addProduct/:productId', productController.addToCart)

//GET - product detail
router.get('/:productId', productController.getDetail)



module.exports = router