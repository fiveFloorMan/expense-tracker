// url = localhost:PORT/records
const express = require('express')
const { redirect } = require('express/lib/response')
const router = express.Router()

const Record = require('../../models/record')

// Edit 介面

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