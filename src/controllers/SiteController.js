const fetcher = require('axios')
const api = require('../config/Config')

class SiteController {

    //GET - homepage
    homePage(req, res, next){
        const user = req.session.User
        if(user){
            axios.get(api.productsInCart, {
                params: {
                    userID: user.userID
                }
              })
              .then(response => {
                  //check res code
                  fetcher.get(api.allProducts)
                  .then(pResponse => {
                      //check
                      res.render('home', {user: user, productsInCart: response.listProductInCart.size, listProduct: pResponse.listProduct})
                  })
                
              })
              .catch(next)
        } else{
            res.render('home', {user: false})
        }
    }
}

module.exports = new SiteController()