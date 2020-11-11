var express = require('express')
const userModel = require('../../models/user')
var router = express.Router()

router.get('/api/users', async (req, res) => {
    const users = await userModel.find({})

    try {
        res.send(users)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/api/user/:username', async (req, res) => {
    try {
        const user = await userModel.findOne({
            username: req.params.username
        })
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/api/user', async (req, res) => {
    const user = new userModel(req.body);

    try {
        await user.save()
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.put('/user/:id', async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body)
        await userModel.save()
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/api/user/:id', async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id)
        if (!user) res.status(404).send("No user found")
        res.status(200).send("User successfully deleted.")
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/api/users', async (req, res) => {
    try {
        await userModel.deleteMany()
        res.status(200).send("All users successfully deleted.")
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router
