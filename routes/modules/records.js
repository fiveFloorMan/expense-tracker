// url = localhost:PORT/records
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// Edit 介面
router.get('/:recordId/edit', (req, res) => {
  const { recordId } = req.params
  Record.findOne({ _id : recordId })
    .populate('categoryId', Category)
    .lean()
    .then(record => {
      record.date = record.date.toJSON().toString().slice(0, 10)
      return res.render('edit', record)
    })
    .catch(error => console.log(error))
})
// Edit 回傳data

// Delete
router.delete('/:recordId/delete', (req, res) => {
  const { recordId } = req.params
  Record.findOne({ _id : recordId })
    .then(record => { record.remove() })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router