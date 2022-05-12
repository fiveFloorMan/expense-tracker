const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

require('./config/mongoose')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.listen(PORT, () => {
  console.log(`Running in localhost:${PORT}`)
})