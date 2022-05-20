//  URL = localhost:PORT/
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// 符合使用者的個人紀錄
router.get('/', (req, res) => {
  const userId = res.locals.user
  Record.find({ userId })
    .populate('categoryId', Category)
    .lean()
    .then(records => { 
      let totalAmount = 0
      Promise.all(Array.from(records, record => {
        totalAmount += record.amount 
      }))
      return res.render('index', { records, totalAmount }) 
    })
    .catch(error => console.log(error))
})

module.exports = router

// records = 
// [
//   {
//     _id: 628633dc1fac1226544dec0e,
//     name: 'record1',
//     amount: 100,
//     userId: 628633db1fac1226544debf1,
//     categoryId: {
//       _id: 628633da56cc9c2b70003ab2,
//       name: '家居物業',
//       icon: 'fa-solid fa-house',
//       __v: 0
//     },
//     date: 2022-05-19T12:11:08.117Z,
//     __v: 0
//   },