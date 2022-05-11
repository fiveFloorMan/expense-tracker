const Category = require('../category')

const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create({ name: 'testCategory' })
    .then(() => console.log('categorySeeder.js is done'))
    .then(() => process.exit())
})