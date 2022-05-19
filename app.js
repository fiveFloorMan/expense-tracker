const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ExpenseTrackerSecret',
  resave: false,
  saveUninitialized: true
}))

require('./config/mongoose')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.listen(PORT, () => {
  console.log(`Running in localhost:${PORT}`)
})