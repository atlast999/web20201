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
            console.log('at detail: ', response.data)
            res.render('detail', {product: response.data.content[0]})
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
                console.log('at card: ', response.data)
                res.render('cart', {listProduct: response.data.content})
            })
            .catch(next)
        } else {
            res.json({error: 'not logged in!'})
        }
    }

    //GET - show payment
    showPayment(req, res, next){
        const user = req.session.User
        fetcher.post(api.productsInCart, {
            userId: user.userId
        })
        .then(response => {
            console.log('at card: ', response.data)
            res.render('checkout', {listProduct: response.data.content})
        })
        .catch(next)
    }

    //POST confirm payment
    confirmPayment(req, res, next){
        const user = req.session.User
        fetcher.post(api.defaultPayment, {
            userId: user.userId
        })
        .then(response => {
            console.log('at confirm payment: ', response.data)
            res.json(response)
        })
        .catch(next)
    }

    //GET - add to cart
    addToCart(req, res, next){
        const user = req.session.User
        if(!user){
            res.json({error: 'not logged in'})
            return
        }
        const productID = req.params.productId
        fetcher.post(api.addProducts, {
            userId: user.userId,
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