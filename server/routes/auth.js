var express = require('express')
var passport = require('passport')
const jwt = require('jsonwebtoken');
var router = express.Router()

router.post('/auth/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
        message: 'Signup successful',
        user: req.user
      })
    }
)

router.post('/auth/login',
    async (req, res, next) => {
      passport.authenticate('login',
          async (err, user, info) => {
            try {
              if (err) {
                return next(new Error('An error occurred.'))
              }
              if (!user) {
                return res.json({
                  message:info.message
                })
              }
              req.login(user, { session: false },
                  async (error) => {
                    if (error) return next(error)

                    const body = { _id: user._id, username: user.username }
                    const token = jwt.sign({ user: body }, 'TOP_SECRET')

                    return res.json({
                          message: 'Login successful',
                          user: user,
                          token: token
                      })
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
