const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

const usePassport = require('./config/passport')
require('./config/mongoose')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ExpenseTrackerSecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))

usePassport(app)

app.use(routes)

app.listen(PORT, () => {
  console.log(`Running in localhost:${PORT}`)
})