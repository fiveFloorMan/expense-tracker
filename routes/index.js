const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const users = require('./modules/users')
const records = require('./modules/records')

router.use('/users', users)
router.use('/records',authenticator, records)
router.use('/', authenticator, home) // Record


module.exports = router