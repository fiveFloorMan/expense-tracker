const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const PORT = 3000

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

require('./config/mongoose')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`Running in localhost:${PORT}`)
})