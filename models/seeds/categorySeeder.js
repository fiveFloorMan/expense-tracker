const Category = require('../category')

const db = require('../../config/mongoose')
const categoryList = require('./categoryList.json')

db.once('open', () => {

  return Promise.all(Array.from({ length: 5 }, (_, index) => {
      return Category.create({ 
        name: categoryList[index].name,
        icon: categoryList[index].icon
      })
  }))

    .then(() => console.log('categorySeeder.js is done'))
    .then(() => process.exit())
})

