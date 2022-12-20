const express = require('express')
const router = express.Router()
const { acceptsLanguages } = require('express/lib/request')
const userData = require('../../model/userData')
const bookDetails = require('../../model/bookDetails')
const cartDetails = require('../../model/cartDetails')
const { redirect } = require('express/lib/response')

router.get('/account', (req, res) => {
  res.render('account')
})
router.post('/register', async (req, res) => {
  const user = new userData({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    typed: 'user',
  })
  user.save()
  res.redirect('account')
})

router.get('/', async (req, res) => {
  const all = await bookDetails.find().limit(3)
  res.render('index', { details: all })
})
router.post('/LandingPage', async (req, res) => {
  const userName = req.body.username
  const all = await bookDetails.find().limit(3)
  userData.findOne({ username: req.body.username }, function (err, user) {
    if (err) return handleError(err)
    if (req.body.password == user.password && user.typed == 'user') {
      req.session.username = userName
      cartDetails.deleteMany({ username: userName })

      res.render('LandingPage', { details: all })
    } else if (req.body.password == user.password && user.typed == 'admin') {
      req.session.username = userName
      req.session.type == user.typed
      res.render('adminLanding', { details: all })
    } else if (user.typed != 'admin') {
      res.render('account', { error: 'Not admin account' })
    } else {
      res.render('account', { error: 'Username and Password does not match' })
    }
  })
})
router.get('/editAccount', async (req, res) => {
  if (!req.session.username) return res.render('account')
  const user = await userData.findOne({ username: req.session.username })
  console.log(`🚀 ~ file: user.js:54 ~ router.get ~ user`, user)
  res.render('EditAccount', { user })
})
router.post('/editAccount', async (req, res) => {
  if (!req.session.username) return res.render('account')

  userData.findOne({ username: req.body.username }, async function (err, user) {
    if (req.body.password == user.password) {
      const wait1 = await userData.deleteMany({
        username: req.body.username,
        email: req.body.email,
      })
      const user1 = new userData({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password2,
        typed: 'user',
      })
      user1.save()
      res.render('EditAccount', { error: 'Password updated successfully' })
    } else {
      res.render('EditAccount', {
        error: 'The email/current Password does not match',
      })
    }
  })
})

router.get('/LandingPage', async (req, res) => {
  if (!req.session.username) return res.render('account')

  const filter = {}
  const all = await bookDetails.find(filter)
  const user = await userData.findOne({ username: req.session.username })

  if (user.typed === 'user') res.render('LandingPage', { details: all })
  else res.render('adminLanding', { details: all })
})

router.get('/adminLanding', async (req, res) => {
  if (!req.session.username) return res.render('account')

  const filter = {}
  const all = await bookDetails.find(filter)

  res.render('adminLanding', { details: all })
})
router.post('/addAccount', async (req, res) => {
  if (!req.session.username) return res.render('account')
  const user = new userData({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    typed: 'admin',
  })
  user.save()
  res.render('addAdmin', { success: 'New Admin Created' })
  res.redirect('addAdmin')
})
router.get('/addAccount', (req, res) => {
  if (!req.session.username) return res.render('account')
  res.render('addAdmin')
})
router.post('/logout', async (req, res) => {
  req.session.destroy((err) => {
    res.render('account')
  })
})

module.exports = router
