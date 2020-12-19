const fetcher = require('axios')
const api = require('../config/Config')

class ProductController {

    //authenticatting midleware
    authenticate(req, res, next){
        const user = req.session.User
        if(user){
            next()
        }else{
            res.redirect('http://localhost:3000/account/login')
        }
    }

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
            fetcher.post(api.productsInCart, {
                userId: user.userId
            })
            .then(response => {
                console.log('at card: ', response.data)
                const listProducts = response.data.content
                var total = 0
                listProducts.forEach(product => total += product.price * product.quantity)
                res.render('cart', {listProduct: listProducts, totalPrice: total.toLocaleString()})
            })
            .catch(next)
    }

    //POST - edit cart
    editCart(req, res, next){
        const user = req.session.User
        const productID = req.params.productId
        const updateType = req.body.action
        fetcher.post(api.updateProducts, {
            userId: user.userId,
            productId: productID,
            type: updateType
        })
        .then(response => {
            //check
            res.redirect('http://localhost:3000/product/cart')
        })
    }

    //GET - show payment
    showPayment(req, res, next){
        const user = req.session.User
        fetcher.post(api.productsInCart, {
            userId: user.userId
        })
        .then(response => {
            console.log('at payment: ', response.data)
            const listProducts = response.data.content
            var total = 0
            listProducts.forEach(product => total += product.price * product.quantity)
            fetcher.post(api.userInfo, {
                id: user.userId
            })
            .then(responseUser => {
                res.render('checkout', {listProduct: listProducts, totalPrice: total.toLocaleString(), user: responseUser.data.content})
            })
            .catch(next)
        })
        .catch(next)
    }

    //POST confirm payment
    confirmPayment(req, res, next){
        const user = req.session.User
        const paymentType = req.body.payment
        if(paymentType == 'cancel'){
            res.redirect('http://localhost:3000/')
            return
        }
        fetcher.post(api.defaultPayment, {
            userId: user.userId
        })
        .then(response => {
            console.log('at confirm payment: ', response.data)
            // if(response.data.)
            res.render('success-payment')
        })
        .catch(next)
    }

    //POST confirm payment new info
    confirmPaymentNewInfo(req, res, next){
        const user = req.session.User
        const paymentType = req.body.payment
        if(paymentType == 'cancel'){
            res.redirect('http://localhost:3000/')
            return
        }
        var body = req.body
        body.userId = user.userId
        delete body.payment
        fetcher.post(api.defaultPayment, body)
        .then(response => {
            console.log('at confirm payment new info: ', response.data)
            // if(response.data.)
            res.render('success-payment')
        })
        .catch(next)
    }


    //GET - add to cart
    addToCart(req, res, next){
        const user = req.session.User
        const productID = req.params.productId
        fetcher.post(api.updateProducts, {
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