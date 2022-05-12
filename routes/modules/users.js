// URL = localhost:PORT/users
const express = require('express')
const router = express.Router()

const User = require('../../models/user')

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
  if (password !== confirmPassword){
    return res.render('register', { name, password })
  }
  User.create({ name, password })
    .then()
    .catch(error => console.log(error))
  res.redirect('/users/login')
})
module.exports = router