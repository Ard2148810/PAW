var express = require('express')
var passport = require('passport')
const userModel = require('../../models/user')
var router = express.Router()

router.get('/api/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const users = await userModel.find({})

    try {
        res.send(users)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/api/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await userModel.findOne({
            username: req.params.username
        })
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/api/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    var user = new userModel(req.body)
    user.password = user.hashPassword(req.body.user.password)

    try {
        await user.save()
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.put('/api/users/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if(req.user._id !== req.params.id) res.status(400).send("You are not logged in as this user.")
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body.user)
        await user.save()
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/api/users/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if(req.user._id !== req.params.id) res.status(400).send("You are not logged in as this user.")
    userModel.findByIdAndRemove(req.params.id).then(() => {
        res.status(200).send("User successfully deleted.")
    }).catch((err) => {
        res.status(500).send(err)
    })
})

router.delete('/api/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await userModel.deleteMany()
        res.status(200).send("All users successfully deleted.")
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router
