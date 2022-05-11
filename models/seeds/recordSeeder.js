const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://alpha:camp@harvie.klobq.mongodb.net/expense-tracker?retryWrites=true&w=majority')
const Record = require('../record')

const db = mongoose.connection

db.on('error', () => {
  console.log(`mongoose connect error in recordSeeder.js`)
})

db.once('open', () => {
  console.log(`mongoose is connecting from expense-tracker`)
    Record.create({
      name: 'test',
      date: Date.now(),
      amount: 100,
    })
  console.log(`Create records is done!`)
})