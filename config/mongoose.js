const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://alpha:camp@harvie.klobq.mongodb.net/expense-tracker?retryWrites=true&w=majority', { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true})

const db = mongoose.connection

db.on('error', () => {
  console.log(`mongoose error`)
})

db.once('open', () => {
  console.log(`mongoose connection!`)
})

module.exports = db