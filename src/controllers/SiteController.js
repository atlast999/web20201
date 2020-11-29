const fetcher = require('axios')
const api = require('../config/Config')

class SiteController {

    //GET - homepage
    homePage(req, res, next){
        const user = req.session.User
        if(user){
            fetcher.post(api.productsInCart, {
                userId: user.userId
              })
              .then(response => {
                  //check res code
                  fetcher.get(api.allProducts)
                  .then(pResponse => {
                      //check
                      res.render('home', {user: user, productsInCart: response.data.listProduct.length, listProduct: pResponse.data.listProduct})
                  })
                  .catch(next)
              })
              .catch(next)
        } else{
            res.render('home', {user: false})
        }
    }
}

module.exports = new SiteController()