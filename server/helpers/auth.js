const jwt = require('jsonwebtoken')

const createToken = user => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email
  }, process.env.JWT_SECRET)
}

const verifyToken = token => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

const randomNumber = () => {
  return Array.from(Array(5), el => Math.floor(Math.random() * 10)).join('')
}


module.exports = {
  createToken,
  randomNumber,
  verifyToken
}

