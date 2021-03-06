module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('success_msg', '請先登入才能使用')
    res.redirect('/users/login')
  }
}

// req.isAuthenticated 會根據登入與否回傳true/false