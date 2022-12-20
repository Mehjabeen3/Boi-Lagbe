const express = require('express')
const router = express.Router()

const bookDetails = require('../../model/bookDetails')
const orderDetails = require('../../model/orderDetails')
const { redirect } = require('express/lib/response')

router.get('/addBook', (req, res) => {
  if (!req.session.username) return res.render('account')
  res.render('addBook')
})

router.post('/addBook', async (req, res) => {
  if (!req.session.username) return res.render('account')
  const books = new bookDetails({
    name: req.body.name,
    author: req.body.author,
    publisher: req.body.publisher,
    genre: req.body.genre,
    demographic: req.body.demographic,
    image: req.body.img,
    price: req.body.price,
  })
  books.save()
  res.render('addBook', { success: 'Books Added to the database' })
})
router.get('/manageBook', async (req, res) => {
  if (!req.session.username) return res.render('account')
  const all = await bookDetails.find()
  res.render('deleteBook', { details: all })
})
router.post('/deleteBook', async (req, res) => {
  if (!req.session.username) req.session.destroy((err) => res.render('account'))

  console.log(`🚀 ~ file: books.js:53 ~ router.post ~ req.body.id`, req.body.id)
  await bookDetails.findByIdAndDelete(req.body.id)
  console.log(req.session.username)
  const all = await bookDetails.find()
  res.render('deleteBook', { details: all })
})

router.get('/manageOrder', async (req, res) => {
  if (!req.session.username) return res.render('account')
  const all = await orderDetails.find()
  res.render('manageOrder', { details: all })
})
router.post('/manageOrderApprove', async (req, res) => {
  if (!req.session.username) return res.render('account')
  await orderDetails.findByIdAndUpdate(req.body.id, { status: 'approved' })
  res.redirect('/manageOrder')
})
router.post('/manageOrderReject', async (req, res) => {
  if (!req.session.username) return res.render('account')
  await orderDetails.findByIdAndUpdate(req.body.id, { status: 'rejected' })
  res.redirect('/manageOrder')
})

module.exports = router
