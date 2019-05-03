const UserModel = require('../models/User')
const { verifyToken } = require('../helpers/auth')

const authenticate = (req, res, next) => {
  let token = req.headers.authorization
  if (token) {
    try {
      let payload = verifyToken(token)
      UserModel
        .findById(payload._id)
        .then(user => {
          if (user) {
            req.user = user
            next()
          } else {
            res.status(404).json({ message: 'User Not Found' })
          }
        })
        .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
    } catch (e) {
      res.status(400).json({ message: 'Invalid Token' })
    }

  } else {
    res.status(400).json({ message: 'Missing Token' })
  }
}

module.exports = { authenticate }
