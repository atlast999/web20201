const fetcher = require('axios')
const api = require('../config/Config')
const listCategory = require('../config/Categories')
class SiteController {

    //GET - homepage
    homePage(req, res, next){
        const user = req.session.User
        const selectedCategory = 'steam'
        fetcher.post(api.productsByCategory, {
            category: selectedCategory
        })
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
                              res.render('home', {user: user, productsInCart: inCart, listProduct: pResponse.data.content, listCategory: listCategory, selectedCategory: selectedCategory})
                          })
                          .catch(next)
                    } else{
                        console.log('render: ', selectedCategory)
                        res.render('home', {user: false, listProduct: pResponse.data.content, listCategory: listCategory, selectedCategory: selectedCategory})
                    }
                })
                .catch(next)
    }

    //POST home with products classified
    homePageByCategory(req, res, next){
        const user = req.session.User
        const category = req.params.category
        fetcher.post(api.productsByCategory, {
            category: category
        })
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
                              res.render('home', {user: user, productsInCart: inCart, listProduct: pResponse.data.content, listCategory: listCategory, selectedCategory: category})
                          })
                          .catch(next)
                    } else{
                        res.render('home', {user: false, listProduct: pResponse.data.content, listCategory: listCategory, selectedCategory: category})
                    }
                })
                .catch(next)
    }

    search(req, res, next){
        const user = req.session.User
        const selectedCategory = 'steam'
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
                              res.render('home', {user: user, productsInCart: inCart, listProduct: pResponse.data.content, listCategory: listCategory, selectedCategory: selectedCategory})
                          })
                          .catch(next)
                    } else{
                        res.render('home', {user: false, listProduct: pResponse.data.content, listCategory: listCategory, selectedCategory: selectedCategory})
                    }
        })
        .catch(next)
    }
}

module.exports = new SiteController()