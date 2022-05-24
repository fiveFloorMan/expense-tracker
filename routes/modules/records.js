// url = localhost:PORT/records
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// new 
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(category => {
      res.render('new', { category })
    })
})

// new 回傳date
router.post('/new', (req, res) => {
  const userId = res.locals.user
  const createDate = req.body
  Category.findOne({ name : createDate.recordCategory })
    .lean()
    .then(category => {
      Record.create({
        name: createDate.recordName,
        amount: createDate.recordAmount,
        date: createDate.recordDate,
        categoryId: category,
        userId: userId
      })
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Edit 介面
router.get('/:recordId/edit', (req, res) => {
  const { recordId } = req.params
  Record.findOne({ _id : recordId })
    .populate('categoryId', Category)
    .lean()
    .then(record => {
      record.date = record.date.toJSON().toString().slice(0, 10)
      const selectCategory = record.categoryId.name
      Category.find({ _id: { $ne: record.categoryId }})
        .lean()
        .then(category => {
          res.render('edit', { record, selectCategory, category})
        })
    })
    .catch(error => console.log(error))
})
// Edit 回傳data
router.put('/:recordId', (req, res) => {
  const { recordId } = req.params
  const editRecordDate = req.body
  return Category.findOne({ name : editRecordDate.recordCategory })
    .lean()
    .then(category => {
      return Record.findOneAndUpdate({ _id: recordId }
        ,{
          name: editRecordDate.recordName,
          date: editRecordDate.recordDate,
          amount: editRecordDate.recordAmount,
          categoryId: category._id
        },{ new: false })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})
// Delete
router.delete('/:recordId/delete', (req, res) => {
  const { recordId } = req.params
  Record.findOne({ _id : recordId })
    .then(record => { record.remove() })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router