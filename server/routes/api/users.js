var express = require('express')
var passport = require('passport')
const userModel = require('../../models/user')
var router = express.Router()

router.get('/api/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    userModel.findById(req.user._id, async function (err, user) {
        if (err) { res.status(500).send(err) }
        else { res.send(user) }
    });
})

router.get('/api/users/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    userModel.findById(req.params.id, async function (err, user) {
        if (err) { res.status(500).send(err) }
        else {
            res.send(user); }
        }
    );
})


router.put('/api/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    userModel.findByIdAndUpdate(req.user._id, req.body.user,  {new: true}, function (err, user) {
        if (err) { res.status(500).send(err) }
        else { res.status(200).send(user) }
    });
})

router.delete('/api/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    userModel.findByIdAndRemove(req.user._id).then(() => {
        res.status(200).send("User successfully deleted.")
    }).catch((err) => {
        res.status(500).send(err)
    })
})

// FOR TESTING

router.delete('/api/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await userModel.deleteMany()
        res.status(200).send("All users successfully deleted.")
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router
