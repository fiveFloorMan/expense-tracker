// URL = localhost:PORT/user
const express = require('express')
const router = express.Router()

// login 介面
router.get('/login', (req, res) => {
  res.render('login')
})
// login 介面回傳data
router.post('/login', (req, res) => {
  const { name, password } = req.body
  console.log(`name: ${name}; password: ${password}` )
  res.redirect('/')
})

// register 介面
router.get('/register', (req, res) => {
  res.render('register')
})
// register 介面回傳data
router.post('/register', (req, res) => {
  const {name, password, confirmPassword} = req.body
  
  console.log(`name: ${name} ; password: ${password}; confirmPassword: ${confirmPassword}`)
  res.redirect('/')
})
module.exports = router