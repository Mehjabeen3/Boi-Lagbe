const express = require('express')
const router = express.Router()

const userData = require('../../model/userData')
const bookDetails = require('../../model/bookDetails')
const orderDetails = require('../../model/orderDetails')
const cartDetails = require('../../model/cartDetails')
const { redirect } = require('express/lib/response')

//adding cart item to a cart initialized after every login
router.post('/cart', async (req, res) => {
  if (!req.session.username) return res.render('account')
  const filter = { name: req.body.name }
  const all = await bookDetails.find(filter)
  const inCart = await cartDetails.find(filter)
  let quant = 1
  if (inCart != []) {
    quant = inCart.quantity + 1
  }
  const cart = new cartDetails({
    username: req.session.username,
    name: all[0].name,
    author: all[0].author,
    genre: all[0].genre,
    image: all[0].image,
    price: all[0].price,
    quantity: 1,
  })
  await cart.save()
  res.render('bookDetails', {
    details: all[0],
    success: 'Successfully added to cart.',
  })
})
//rendering to the cart page
router.get('/cart', async (req, res) => {
  if (!req.session.username) return res.render('account')
  const filter = { username: req.session.username }
  const all = await cartDetails.find(filter)
  res.render('shoppingCart', { details: all })
})
//rendering to the cart page
router.get('/confirm', async (req, res) => {
  if (!req.session.username) {
    req.session.destroy((err) => {
      return res.render('account')
    })
  }
  res.render('confirm')
})
//rendering to the cart page
router.post('/pay', async (req, res) => {
  if (!req.session.username) return res.render('account')

  await cartDetails.deleteMany({ username: req.session.username })

  const newOrder = new orderDetails({
    username: req.session.username,
    method: req.body.method,
    cart: req.body.cart,
  })

  await newOrder.save()

  return res.redirect('/confirm')
})
//rendering to the cart page
router.get('/refresh', async (req, res) => {
  if (!req.session.username) {
    req.session.destroy((err) => {
      return res.render('account')
    })
  }

  await cartDetails.deleteMany({ username: req.session.username })
  res.render('shoppingCart', { details: [] })
})
//remove one item from cart
router.post('/remove', async (req, res) => {
  if (!req.session.username) return res.render('account')
  const wait1 = await cartDetails.deleteOne({
    name: req.body.name,
    username: req.body.username,
  })
  const filter = { username: req.session.username }
  const all = await cartDetails.find(filter)
  if (wait1) {
    res.render('shoppingCart', {
      success: 'One entry successfully deleted',
      details: all,
    })
  }
})
router.post('/payment', async (req, res) => {
  if (!req.session.username) return res.render('account')
  res.render('payment', {
    success:
      'Payment Successful. You will recieve the Books within 1-2 working days',
  })
})
router.get('/payment', async (req, res) => {
  if (!req.session.username) return res.render('account')
  res.render('payment')
})
module.exports = router
