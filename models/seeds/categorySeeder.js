const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://alpha:camp@harvie.klobq.mongodb.net/expense-tracker?retryWrites=true&w=majority')

const Category = require('../category')

const db = mongoose.connection

db.on('error', () => {
  console.log(`mongoose connect error in categorySeeder.js`)
})

db.once('open', () => {
  console.log(`mongoose is connecting from expense-tracker/models/seeds/categorySeeder.js`)
    Category.create({ name: 'testCategory' })
  console.log(`Create category is done!`)
})