const fetcher = require('axios')
const api = require('../config/Config')

class SiteController {

    //GET - homepage
    homePage(req, res, next){
        const user = req.session.User
        fetcher.get(api.allProducts)
                .then(pResponse => {
                    console.log('at all products: ', pResponse.data)
                      //check
                    if(user){
                        fetcher.post(api.productsInCart, {
                            userId: user.userId
                          })
                          .then(response => {
                            console.log('at in cart: ', response.data)
                              //check res code
                              var inCart = 0
                              if(response.data.code == 200){
                                  inCart = response.data.content.length
                              }
                              res.render('home', {user: user, productsInCart: inCart, listProduct: pResponse.data.content})
                          })
                          .catch(next)
                    } else{
                        res.render('home', {user: false, listProduct: pResponse.data.content})
                    }
                })
                .catch(next)
    }

    search(req, res, next){
        const user = req.session.User
        fetcher.post(api.search, {
            name: req.body.name.trim(),
        })
        .then(pResponse => {
            console.log('at search products: ', pResponse.data)
                      //check
                    if(user){
                        fetcher.post(api.productsInCart, {
                            userId: user.userId
                          })
                          .then(response => {
                            console.log('at in cart: ', response.data)
                              //check res code
                              var inCart = 0
                              if(response.data.code == 200){
                                  inCart = response.data.content.length
                              }
                              res.render('home', {user: user, productsInCart: inCart, listProduct: pResponse.data.content})
                          })
                          .catch(next)
                    } else{
                        res.render('home', {user: false, listProduct: pResponse.data.content})
                    }
        })
        .catch(next)
    }
}

module.exports = new SiteController()