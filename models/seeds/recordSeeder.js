// 暫時放棄中 目前的狀態是發現User.create 到 User.findOne之間短

const db = require('../../config/mongoose')

const User = require('../user')
const Record = require('../record')

db.once('open', () => {
  
  User.create({
    name: 'test',
    password: 'test'
  })
  
  User.findOne({ name : 'test' })
    .lean()
    .then(user => {
      console.log('user: ', user)
      const userId = user._id
      
      Record.create({
        name: 'Movie(test)',
        date: Date.now(),
        amount: 250,
        userId: userId,
      })
      
    })
    

    
    .then(() => console.log('recordSeeder.js is done'))
    .then(() => process.exit())
})
