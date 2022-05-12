const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const user = require('./modules/user')

router.use('/', home)
router.use('/user/', user)

module.exports = router