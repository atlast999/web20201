const express = require('express')
const router = express.Router()

const siteController = require('./../controllers/SiteController')

//GET - home page with products classified
router.get('/:category', siteController.homePageByCategory)

//POST - search product
router.post('/search', siteController.search)

//GET - home page
router.get('/', siteController.homePage)

//POST - home page with products classified
router.post('/', siteController.homePageByCategory)

module.exports = router