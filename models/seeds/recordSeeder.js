const db = require('../../config/mongoose')

const Record = require('../record')

db.once('open', () => {
  Record.create({
    name: 'testRecord',
    date: Date.now(),
    amount: 100,
  })
    .then(() => console.log('recordSeeder.js is done'))
    .then(() => process.exit())
})