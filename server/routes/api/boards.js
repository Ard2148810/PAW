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

router.post('/api/boards', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const board = new boardModel(req.body.board);
    board.owner = req.user._id

    try {
        await board.save()
        res.send(board)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/api/boards/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const board = await boardModel.findById(req.params.id)
        res.send(board)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/api/boards/:name', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const board = await boardModel.findOne({
            name: req.params.name
        })
        res.send(board)
    } catch (err) {
        res.status(500).send(err)
    }
})


router.put('/api/boards/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const board = await boardModel.findById(req.params.id)
        if (!board) res.status(404).send("No board found.")
        if (board.owner !== req.user._id) res.status(404).send("You are not the owner of this board.")
        const newBoard = await boardModel.findByIdAndUpdate(req.params.id, req.body.board)
        newBoard.save()
        res.send(newBoard)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/api/boards/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const board = await boardModel.findById(req.params.id)
        if (!board) res.status(404).send("No board found.")
        if (board.owner !== req.user._id) res.status(404).send("You are not the owner of this board.")
        board.delete()
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

router.get('/api/boards/user/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if(req.user._id !== req.params.id) res.status(400).send("You are not logged in as this user.")
        const boards = await boardModel.find({
            $or: [
                {owner: req.params.id},
                {teamMembers: req.params.id},
                {guests: req.params.id}
            ]
        })
        res.send(boards)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/api/boards/owner/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if(req.user._id !== req.params.id) res.status(400).send("You are not logged in as this user.")
    var boards;
    try {
        boards = await boardModel.find({
            owner: req.params.id
        })
    } catch (err) {
        res.status(500).send(err)
    }
    res.send(boards)
})

router.get('/api/boards/teammember/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if(req.user._id !== req.params.id) res.status(400).send("You are not logged in as this user.")
    let boards;
    try {
        boards = await boardModel.find({
            teamMembers: req.params.id
        })
    } catch (err) {
        res.status(500).send(err)
    }
    res.send(boards)
})

router.get('/api/boards/guest/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if(req.user._id !== req.params.id) res.status(400).send("You are not logged in as this user.")
    let boards;
    try {
        boards = await boardModel.find({
            guests: req.params.id
        })
    } catch (err) {
        res.status(500).send(err)
    }
    res.send(boards)
})

module.exports = router
