const express = require('express')
const path = require('path')

const server = express() 


const exphbs  = require('express-handlebars')
server.engine('handlebars', exphbs())
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'handlebars')

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(express.static(path.join(__dirname, './../public')))


//routes
const siteRouter = require('./routes/SiteRouter')
server.use('/', siteRouter)

const userRouter = require('./routes/UserRouter')
server.use('/account', userRouter)

const port = 3000
server.listen(port, () => console.log('Server is running'))

module.exports = server