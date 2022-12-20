const express = require('express')
// const mongoose=require("mongoose")
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const { redirect } = require('express/lib/response')

const app = express()

app.use(bodyParser.json())
app.use(express.json())
app.use('/static/', express.static('public'))
app.use('/images', express.static(path.join(__dirname, 'public/images')))
app.use(bodyParser.urlencoded())
app.set('view engine', 'ejs')

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(
  session({
    secret: 'asd-dweC-EDSAKJHy',
    resave: true,
    saveUninitialized: true,
  })
)
//routing to all the other controllers from here->

const userRouter = require('./routes/user')
app.use('/', userRouter)
const bookRouter = require('./routes/books')
app.use('/', bookRouter)
const viewBookRouter = require('./routes/viewBook')
app.use('/', viewBookRouter)
const cartRouter = require('./routes/cart')
app.use('/', cartRouter)

module.exports = app
