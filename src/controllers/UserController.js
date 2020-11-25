const fetcher = require('axios')
const api = require('../config/Config')

class UserController {

    //GET - login page
    showLogin(req, res, next){
        res.render('login')
    }
    //POST - login
    login(req, res, next){
        fetcher.post(api.login, {
            params: {
                username: req.username,
                password: req.password,
            }
        })
        .then(response => {
            //check res
            req.session.User = {
                account: req.username,
                userID: response.userID
            }
            res.redirect('/')
        })
        .catch(next)
    }

    //GET - register page
    showRegister(req, res, next){
        res.render('register')
    }

    //POST - register
    register(req, res, next){
        fetcher.post(api.register, {
            params: {
                username: req.username,
            }
        })
        .then(response => {
            //check res code
            res.redirect('/')
        })
    }

}

module.exports = new UserController()