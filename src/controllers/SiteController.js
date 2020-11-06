class SiteController {

    //GET - homepage
    homePage(req, res, next){
        res.render('home')
    }
}

module.exports = new SiteController()