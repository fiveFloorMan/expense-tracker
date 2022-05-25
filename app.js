const express = require('express')
const Handlebars = require('handlebars')
const session = require('express-session')
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const routes = require('./routes')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT || 3000

const usePassport = require('./config/passport')
require('./config/mongoose')

app.engine('handlebars', exphbs({ handlebars: allowInsecurePrototypeAccess(Handlebars) }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ExpenseTrackerSecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))

usePassport(app)

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_mgs')
  next()
})

app.use(methodOverride('_method'))

app.use(routes)

app.listen(PORT, () => {
  console.log(`Running in localhost:${PORT}`)
})