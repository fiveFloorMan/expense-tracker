const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'name'}, (name, password, done) => {
    User.findOne({ name })
      .then(user => {
        if (!user) {
          console.log('user不存在')
          return done(null, false, {message: 'user不存在'})
        }
        if (user.password !== password) {
          return done(null, false, {message: '帳號或是密碼錯誤'})
        }
        return done(null, user)
      })
      .catch(error => done(error, false))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, null))
  })
}