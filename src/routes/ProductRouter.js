const express = require('express')
const router = express.Router()

const productController = require('../controllers/ProductController')

//routes with slug must be at the end

//POST - edit cart
router.post('/cart/:productId', productController.authenticate, productController.editCart)

//GET - show cart
router.get('/cart', productController.authenticate, productController.showCart)

//GET - show payment
router.get('/payment',productController.authenticate, productController.showPayment)

//POST - confirm payment
router.post('/payment', productController.authenticate, productController.confirmPayment)

//POST - confirm payment new info
router.post('/payment-new-info', productController.authenticate, productController.confirmPaymentNewInfo)

//GET - add to cart
router.get('/cart/addProduct/:productId',productController.authenticate, productController.addToCart)

//GET - product detail
router.get('/:productId', productController.getDetail)



module.exports = router