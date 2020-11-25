var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
var userModel  = require('../models/user')

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (id, done) {
    userModel.findById(id, function(err, user) {
        done(err, user)
    })
})

passport.use('signup', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        try {
            const user = await userModel.findOne({username: username})
            if (user) {
                return done(null, false, {message: 'User already exists'})
            } else {
                const name = req.body.name
                const email = req.body.email
                const newUser = await userModel.create({username: username, name: name, email: email, password: password})

                return done(null, newUser, { message: 'Signed up Successfully' })
            }
        } catch (error) {
            done(error)
        }
    })
)

passport.use('login', new LocalStrategy(
    {
        usernameField: 'login',
        passwordField: 'password'
    },
    async (login, password, done) => {
        try {
            var user = await userModel.findOne({
                $or: [
                    {username: login},
                    {email: login},
                ],
            })
            if (!user) {
                return done(null, false, { message: 'User not found' })
            }
            const validate = await user.validPassword(password)
            if (!validate) {
                return done(null, false, { message: 'Wrong Password' })
            }
            return done(null, user, { message: 'Logged in Successfully' })
        } catch (error) {
            return done(error);
        }
    })
)

passport.use(new JWTstrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromHeader('token')
        },
        async (token, done) => {
            try {
                return done(null, token.user)
            } catch (error) {
                done(error)
            }
        }
    )
)

module.exports = passport
