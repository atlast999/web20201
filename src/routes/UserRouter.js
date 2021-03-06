const express = require('express')
const router = express.Router()

const userController = require('../controllers/UserController')

//GET - login page
router.get('/login', userController.showLogin)

//POST - login 
router.post('/login', userController.login)

//GET - register page
router.get('/register', userController.showRegister)

//POST - register
router.post('/register', userController.register)

//gET - log out
router.get('/logout', userController.logout)

module.exports = router