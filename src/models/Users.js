// Node Modules
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  id: { type: String },
  blacklisted: { type: Boolean }
})

var user = mongoose.model('users', UserSchema)
module.exports = user

module.exports.addUser = (user, callback) => {
  user.save(callback)
}

module.exports.getUserbyUID = (id, callback) => {
  var query = { id: id }
  user.findOne(query, callback)
}

module.exports.getUserbyID = (id, callback) => {
  user.findById(id, callback)
}
