const { OAuth2Client } = require('google-auth-library')

const UserModel = require('../models/User')
const { createToken, randomNumber } = require('../helpers/auth')

class Auth {
  static register (req, res) {
    UserModel
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => {
        return res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            wishes: user.wishes
          }
        })
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static login (req, res) {
    UserModel
      .findOne({ email: req.body.email })
      .then(user => {
        if (user && user.comparePassword(req.body.password)) {
          let token = createToken(user)
          res.status(201).json({
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              wishes: user.wishes
            },
            token
          })
        } else {
          res.status(400).json({ message: 'Invalid email or password' })
        }
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static googleSignin (req, res) {
    let token = req.body.token

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

    client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        const { email, name } = ticket.getPayload()

        return UserModel
          .findOne({ email })
          .then(user => {
            if (user) {
              return user
            } else {
              return UserModel.create({
                password: randomNumber(),
                email,
                name
              })
            }
          })
      })
      .then(user => {
        let jwt_token = createToken(user)
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            wishes: user.wishes
          },
          token: jwt_token
        })
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }
}

module.exports = Auth
