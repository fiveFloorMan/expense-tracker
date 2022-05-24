const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true})

const db = mongoose.connection

db.on('error', () => {
  console.log(`mongoose error`)
})

db.once('open', () => {
  console.log(`mongoose connection!`)
})

module.exports = db