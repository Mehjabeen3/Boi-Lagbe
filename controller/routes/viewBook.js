const express = require('express')
const router = express.Router()

const bookDetails = require('../../model/bookDetails')
const userData = require('../../model/userData')
const { redirect } = require('express/lib/response')

router.get('/details', async (req, res) => {
  const filter = { name: req.body.name }
  const all = await bookDetails.find(filter)
  res.render('bookDetails', { details: all[0] })
})
router.get('/detailsAdmin', async (req, res) => {
  const filter = { name: req.body.name }
  const all = await bookDetails.find(filter)
  res.render('bookDetailsAdmin', { details: all[0] })
})
router.post('/details', async (req, res) => {
  if (!req.session.username) return res.render('account')

  const filter = { name: req.body.name }
  const all = await bookDetails.find(filter)
  res.render('bookDetails', { details: all[0] })
})

router.post('/detailsAdmin', async (req, res) => {
  if (!req.session.username) return res.render('account')

  const filter = { name: req.body.name }
  const all = await bookDetails.find(filter)
  console.log(`🚀 ~ file: viewBook.js:39 ~ router.post ~ all`, all)
  res.render('bookDetailsAdmin', { details: all[0] })
})

router.get('/browse', async (req, res) => {
  if (!req.session.username) return res.render('account')
  const filter = {}
  const all = await bookDetails.find(filter)
  res.render('products', { details: all })
})
router.get('/sortName', (req, res) => {
  if (!req.session.username) return res.render('account')
  bookDetails
    .find({})
    .sort('name')
    .exec(function (err, docs) {
      res.render('products', { details: docs, s: 0 })
    })
})
router.get('/sortNameAdmin', (req, res) => {
  if (!req.session.username) return res.render('account')

  bookDetails
    .find({})
    .sort('name')
    .exec(function (err, docs) {
      res.render('deleteBook', { details: docs, s: 0 })
    })
})

router.get('/sortPrice', (req, res) => {
  if (!req.session.username) return res.render('account')
  bookDetails
    .find({})
    .sort('price')
    .exec(function (err, docs) {
      res.render('products', { details: docs, s: 0 })
    })
})
router.get('/sortPriceAdmin', (req, res) => {
  if (!req.session.username) return res.render('account')
  bookDetails
    .find({})
    .sort('price')
    .exec(function (err, docs) {
      res.render('deleteBook', { details: docs, s: 0 })
    })
})

router.get('/search', async (req, res) => {
  if (!req.session.username) return res.render('account')

  const user = await userData.find({ username: req.session.username })
  const all = await bookDetails.find()

  if (user[0].typed == 'admin') {
    return res.render('deleteBook', { details: all, s: 0 })
  } else {
    return res.render('products', { details: all, s: 0 })
  }
})

router.post('/search', async (req, res) => {
  if (!req.session.username) return res.render('account')

  const filter1 = { username: req.session.username }
  const user = await userData.find(filter1)
  const all = await bookDetails.find({ $text: { $search: req.body.search } })

  if (user[0].typed == 'admin') {
    return res.render('deleteBook', { details: all, s: 0 })
  } else {
    return res.render('products', { details: all, s: 0 })
  }
})

module.exports = router
