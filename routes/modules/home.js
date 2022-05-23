//  URL = localhost:PORT/
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// 符合使用者的個人紀錄(無選擇類別情況)
router.get('/', (req, res) => {
  const userId = res.locals.user
  Record.find({ userId })
    .populate('categoryId', Category)
    .lean()
    .then(records => { 
      let totalAmount = 0
      let categoryArray = []
      Promise.all(Array.from(records, record => {
        // 計算總花費
        totalAmount += record.amount 
        // 選出簡短的日期, 表示方式: yyyy-mm-dd
        let createYear = record.date.getYear() + 1900
        createYear = createYear.toString()
        let createMonth = record.date.getMonth() + 1
        createMonth = createMonth.toString()
        let createDate = record.date.getDate().toString()
        record.date = createYear + "-" + createMonth + "-" + createDate
        // 挑出所有的類別
        categoryArray.push(record.categoryId.name)
      }))
      // 刪除重複推入的類別
      const categoryList = categoryArray.filter((element, index, self) => {
        return self.indexOf(element) === index
      })
      return res.render('index', { records, totalAmount, categoryList }) 
    })
    .catch(error => console.log(error))
})

// 符合使用者的個人紀錄(有選擇類別情況)
router.post('/', (req, res) => {
  const categorySelectName = req.body.categorySelectName
  const userId = res.locals.user
  Record.find({ userId })
    .populate('categoryId', Category)
    .lean()
    .then(records => {
      let totalAmount = 0
      let categoryArray = []
      let selectRecords = []
      Promise.all(Array.from(records, record => {
        // 挑出所有的類別
        categoryArray.push(record.categoryId.name)
        // 以下是符合所選類別的record計算
        if (record.categoryId.name === categorySelectName) {
          // 計算總花費
          totalAmount += record.amount 
          // 選出簡短的日期, 表示方式: yyyy-mm-dd
          let createYear = record.date.getYear() + 1900
          createYear = createYear.toString()
          let createMonth = record.date.getMonth() + 1
          createMonth = createMonth.toString()
          let createDate = record.date.getDate().toString()
          record.date = createYear + "-" + createMonth + "-" + createDate
          // 符合條件的records
          return selectRecords.push(record)
        } 
        if (categorySelectName === "全部") {
          // 選擇全部的record計算
          // 計算總花費
          totalAmount += record.amount 
          // 選出簡短的日期, 表示方式: yyyy-mm-dd
          let createYear = record.date.getYear() + 1900
          createYear = createYear.toString()
          let createMonth = record.date.getMonth() + 1
          createMonth = createMonth.toString()
          let createDate = record.date.getDate().toString()
          record.date = createYear + "-" + createMonth + "-" + createDate
          // 全部的records
          return selectRecords.push(record)
        }
      }))
      const categoryList = categoryArray.filter((element, index, self) => {
        return self.indexOf(element) === index
      })
      return res.render('index', { totalAmount, categoryList, selectRecords}) 
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