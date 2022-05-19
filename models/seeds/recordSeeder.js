// 資料生成已經成功追上程式碼，接下來要確定資料的正確性，目前要做資料的objectId串聯。

const db = require('../../config/mongoose')

const User = require('../user')
const Record = require('../record')
const Category = require('../category')

const recordList = require('./recordList.json')
const categoriesList = require('./categoryList.json')

const SEED_USER = [
  {
    name: 'tester1',
    password: '01'
  },
]



db.once('open',() => {
  // 創造使用者資料
  Promise.all(Array.from(SEED_USER, seedUser => {
    return User.create({
      name: seedUser.name,
      password: seedUser.password
    })
  }))
  // user = tester1
  .then(user => {
    Promise.all(Array.from(user, user => {
      // record = name:record1 , data: .....
      return Promise.all(Array.from(recordList, record => {
        // category = name: "家居物業" , icon: ....
        return Promise.all(Array.from(categoriesList, category => {
          Category.findOne({ name: category.name }) 
          .lean()
          .then(category => {
              return Record.create({
                name: record.name,
                data: Date.now(),
                amount: record.amount,
                userId: user._id,
                categoryId: category._id
              })
          })
        }))
      }))
    }))
  })
  .then(() => {
    console.log('recordSeeder.js is done')
  })
})


