const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  wishes: [ Number ]
})

userSchema.pre('save', function () {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password)
  }
})

userSchema.methods.comparePassword = function (str) {
  return bcrypt.compareSync(str, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User
