const fetcher = require('axios')
const api = require('../config/Config')

class ProductController {


    //GET - product detail
    getDetail(req, res, next){
        res.render('detail')
    }

    //GET - show cart
    showCart(req, res, next){
        res.render('cart')
    }

    //GET - show payment
    showPayment(req, res, next){
        res.render('checkout')
    }

    //GET - add to cart
    addToCart(req, res, next){
        const userID = req.session.User.userID
        const productID = req.params.productId
        fetcher.post(api.addProducts, {
            userID: userID,
            productID: productID,
            type: 'add'
        })
        .then(response => {
            //check
            res.redirect('localhost:3000')
        })
        
    }

}

module.exports = new ProductController()