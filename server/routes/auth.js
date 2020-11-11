var express = require('express')
var passport = require('passport')
const jwt = require('jsonwebtoken');
var router = express.Router()

router.post('/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
      res.json({
        message: 'Signup successful',
        user: req.user
      })
    }
)

router.post('/login',
    async (req, res, next) => {
      passport.authenticate('login',
          async (err, user, info) => {
            try {
              if (err) {
                return next(new Error('An error occurred.'))
              }
              if (!user) {
                return next(new Error('User not found.'))
              }
              req.login(user, { session: false },
                  async (error) => {
                    if (error) return next(error)

                    const body = { _id: user._id, username: user.username }
                    const token = jwt.sign({ user: body }, 'TOP_SECRET')

                    return res.json({ token })
                  }
              )
            } catch (error) {
              return next(error)
            }
          }
      )(req, res, next)
    }
)

module.exports = router
