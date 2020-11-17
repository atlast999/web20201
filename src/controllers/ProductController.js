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

}

module.exports = new ProductController()