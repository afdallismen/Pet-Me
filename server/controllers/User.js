class User {
  static addWish (req, res) {
    req.user.wishes.push(req.body.pet_id)
    req.user
      .save()
      .then(user => {
        res.status(200).json({ user })
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static removeWish (req, res) {
    req.user.wishes.pull(req.params.pet_id)
    req.user
      .save()
      .then(user => res.status(200).json({ user }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }
}

module.exports = User
