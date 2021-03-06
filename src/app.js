const express = require('express')
const session = require('express-session')
const path = require('path')

const server = express() 

//use handlebars template and helpers
const exphbs  = require('express-handlebars')
server.engine('handlebars', exphbs({
    helpers: {
        addToCart: (productId) => 'http://localhost:3000/product/cart/addProduct/' + productId,
        gameImage: (productId) => 'http://localhost:3000/gamebg/bg' + productId + '.jpg',
        gameDetail: (productId) => 'http://localhost:3000/product/' + productId,
        updateCart: (productId) => 'http://localhost:3000/product/cart/' + productId,
        gamePrice: (productPrice) => productPrice.toLocaleString(),
        selectedClass: (category, selected) => 
        {
            // console.log('cate: ' + category + ' sele: ' + selected)
            if(category == selected) {
                return '<div class="' + category + ' flex menu-active">'
            }
            return '<div class="' + category + ' flex">'
        }
        ,
        categoryImage: (category) => 'http://localhost:3000/icon/' + category + '.png',
        categoryLink: (category) => 'http://localhost:3000/' + category,
        testSelected: (selectedCate) => {
            console.log(selectedCate)
        }
    }
}))
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'handlebars')

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

//public resources
server.use(express.static(path.join(__dirname, './../public')))

server.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'secret', 
    cookie: { maxAge: 60000 }}))

//routes
const siteRouter = require('./routes/SiteRouter')
server.use('/', siteRouter)

const userRouter = require('./routes/UserRouter')
server.use('/account', userRouter)

const productRouter = require('./routes/ProductRouter')
server.use('/product', productRouter)

const port = 3000
server.listen(port, () => console.log('Server is running'))

module.exports = server