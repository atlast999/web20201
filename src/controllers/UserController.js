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
            account: req.body.username,
            password: req.body.password,
        })
        .then(response => {
            console.log('at login: ', response.data)
            // check res
            if(response.data.code == 200){
                req.session.User = {
                    account: req.body.username,
                    userId: response.data.content.userId
                }
                res.redirect('http://localhost:3000')
            } else {
                res.json(response.data)
            }
            
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
            account: req.body.username,
            fullName: req.body.fullName,
            password: req.body.password,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address
        })
        .then(response => {
            //check res code
            console.log('at register: ', response.data)
            if(response.data.code == 200){
                res.render('success-register')
            } else {
                res.json(response.data)
            }
        })
        .catch(next)
    }

}

module.exports = new UserController()