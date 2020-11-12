var express = require('express')
var passport = require('passport')
const boardModel = require('../../models/board')
var router = express.Router()

router.get('/api/boards', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const boards = await boardModel.find({})

    try {
        res.send(boards)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/api/board', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const board = new boardModel(req.body);

    try {
        await board.save()
        res.send(board)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/api/board/:name', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const board = await boardModel.findOne({
            name: req.params.name
        })
        res.send(board)
    } catch (err) {
        res.status(500).send(err)
    }
})


router.put('/api/board/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const board = await boardModel.findByIdAndUpdate(req.params.id, req.body)
        await boardModel.save()
        res.send(board)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/api/board/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const board = await boardModel.findByIdAndDelete(req.params.id)
        if (!board) res.status(404).send("No board found")
        res.status(200).send("Board successfully deleted.")
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/api/boards', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await boardModel.deleteMany()
        res.status(200).send("All boards successfully deleted.")
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/api/boards/user/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const boards = await boardModel.find({
            $or: [
                {owner: req.params.username},
                {teamMembers: req.params.username},
                {guests: req.params.username}
            ]
        })
        res.send(boards)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/api/boards/owner/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const boards = await boardModel.find({
            owner: req.params.username
        })
        res.send(boards)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/api/boards/teammember/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const boards = await boardModel.find({
            teamMembers: req.params.username
        })
        res.send(boards)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/api/boards/guest/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const boards = await boardModel.find({
            guests: req.params.username
        })
        res.send(boards)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router
