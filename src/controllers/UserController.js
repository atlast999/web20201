const fetcher = require('axios')
class UserController {

    //GET - login page
    showLogin(req, res, next){
        res.render('login')
    }
    //POST - login
    login(req, res, next){
        if(!req.session.User || req.session.User.username != req.username){
            res.json({error: 'User is not registered'})
        }else{
            res.render('home')
            // fetcher.get('https://jsonplaceholder.typicode.com/photos/')
            // .then(response => {
            //     res.json(response)
            // })
            // .catch(next)
        }
    }

    //GET - register page
    showRegister(req, res, next){
        res.render('register')
    }

    //POST - register
    register(req, res, next){
        req.session.User = {
            username: req.username
        }
        res.json(req.body)
    }

}

module.exports = new UserController()