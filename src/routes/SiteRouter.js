const express = require('express')
const router = express.Router()

const siteController = require('./../controllers/SiteController')

//POST - search product
router.post('/search', siteController.search)

//GET - home page
router.get('/', siteController.homePage)

module.exports = router