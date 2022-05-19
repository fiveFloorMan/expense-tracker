// URL = localhost:PORT/users
const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

// login 介面
router.get('/login', (req, res) => {
  res.render('login')
})
// login 介面回傳data
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// register 介面
router.get('/register', (req, res) => {
  res.render('register')
})
// register 介面回傳data
router.post('/register', (req, res) => {
  const { name, password, confirmPassword } = req.body
  const errors = []
  // 判斷有沒有資料是空的
  if (!name || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填的!'})
  }
  // 辨識password 和 confirmPassword 是否一致
  if (password !== confirmPassword) {
    errors.push({ message: '密碼和確認密碼不相符!'})
  }
  if (errors.length) {
    return res.render('register', { errors, name })
  }
  // 判斷name是否已經存在
  User.findOne({ name })
    .then(user => {
      if(user) {
        errors.push({ message: '使用者名稱已經註冊過了!'})
        return res.render('register', { errors, name })
      }
      return User.create({ name, password })
        .then(() => req.flash('success_msg', '你的帳號已經註冊成功了!'))
        .then(() => res.redirect('/users/login'))
        .catch(error => console.log(error))
    })
  // 成立新帳號

})
// 登出帳號
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出了')
  res.redirect('/users/login')
})

module.exports = router