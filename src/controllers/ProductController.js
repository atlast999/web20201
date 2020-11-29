const fetcher = require('axios')
const api = require('../config/Config')

class ProductController {


    //GET - product detail
    getDetail(req, res, next){
        const productID = req.params.productId
        fetcher.post(api.productDetail, {
            id: productID
        })
        .then(response => {
            res.render('detail', {product: response.data.listProduct[0]})
        })
        .catch(next)
        
    }

    //GET - show cart
    showCart(req, res, next){
        const user = req.session.User
        if(user){
            fetcher.post(api.productsInCart, {
                userId: user.userId
            })
            .then(response => {
                res.render('cart', {listProduct: response.data.listProduct})
            })
            .catch(next)
        } else {
            response.json({error: 'not logged in!'})
        }
    }

    //GET - show payment
    showPayment(req, res, next){
        const user = req.session.User
        fetcher.post(api.productsInCart, {
            userId: user.userId
        })
        .then(response => {
            res.render('checkout', {listProduct: response.data.listProduct})
        })
        .catch(next)
    }

    //GET - add to cart
    addToCart(req, res, next){
        const userID = req.session.User.userId
        const productID = req.params.productId
        fetcher.post(api.addProducts, {
            userId: userID,
            productId: productID,
            type: 'add'
        })
        .then(response => {
            //check
            res.redirect('http://localhost:3000/')
        })
        
    }

}

module.exports = new ProductController()