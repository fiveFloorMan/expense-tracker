const express = require('express')
const mongoose = require('mongoose')


const app = express()
const PORT = 3000
mongoose.connect('mongodb+srv://alpha:camp@harvie.klobq.mongodb.net/expense-tracker?retryWrites=true&w=majority')

const db = mongoose.connection

db.on('error', () => {
  console.log(`mongoose is error(expense-tracker)`)
})
db.once('open', () => {
  console.log(`mongoose is connecting from expense-tracker`)
})

app.get('/', (req, res) => {
  res.send('app.js is working')
})

app.listen(PORT, () => {
  console.log(`Running in localhost:${PORT}`)
})