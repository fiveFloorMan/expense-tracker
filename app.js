const express = require('express')

const app = express()
const PORT = 3000

require('./config/mongoose')

app.get('/', (req, res) => {
  res.send('app.js is working')
})

app.listen(PORT, () => {
  console.log(`Running in localhost:${PORT}`)
})