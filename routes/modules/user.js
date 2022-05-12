// URL = localhost:PORT/user
const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', (req, res) => {
  res.redirect('/')
})

router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router