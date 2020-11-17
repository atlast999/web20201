class UserController {

    //GET - login page
    showLogin(req, res, next){
        res.render('login')
    }
    //POST - login
    login(req, res, next){
        res.json(req.body)
    }

    //GET - register page
    showRegister(req, res, next){
        res.render('register')
    }

    //POST - register
    register(req, res, next){
        res.json(req.body)
    }

}

module.exports = new UserController()