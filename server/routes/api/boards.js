var express = require('express')
var passport = require('passport')
const boardModel = require('../../models/board')
var router = express.Router()

router.get('/api/boards', passport.authenticate('jwt', { session: false }), async (req, res) => {
    boardModel.find({teamMembers: req.user._id}, async function (err, board) {
        if (err) { res.status(500).send(err) }
        else { res.send(board) }
    });
})

router.get('/api/boards/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    boardModel.findById(req.params.id, async function (err, board) {
        if (err) { res.status(500).send(err) }
        else {
            if (!board) { res.status(404).send("No board found.") }
            else if (!board.teamMembers.includes(req.user._id)) {
                res.status(404).send("You don't have permissions for this board.")
            }
            else { res.send(board) }
        }
    });
})

router.post('/api/boards', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const board = new boardModel(req.body.board);
    board.owner = req.user._id
    board.teamMembers = [req.user._id]

    try {
        await board.save()
        res.send(board)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.put('/api/boards/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // TODO: put for name (owner), put for content (teammembers), restrict not to change owner
})

router.delete('/api/boards/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    boardModel.findById(req.params.id, async function (err, board) {
        if (err) { res.status(500).send(err) }
        else {
            if (!board) { res.status(404).send("No board found.") }
            else if (board.owner !== req.user._id) {
                res.status(404).send("You don't have permissions to delete this board. " +
                    "Only the owner can delete a board.")
            }
            else {
                await board.delete()
                res.status(200).send("Board successfully deleted.")
            }
        }
    })
})

router.put('/api/boards/:id/assignment', passport.authenticate('jwt', { session: false }), async (req, res) => {
    boardModel.findById(req.params.id, async function (err, board) {
        if (err) { res.status(500).send(err) }
        else {
            if (!board) { res.status(404).send("No board found.") }
            else if (!board.teamMembers.includes(req.user._id)) {
                res.status(404).send("You don't have permissions to assign users to this board.")
            }
            else {
                // TODO: add user to team members
                // TODO: return full user objects, not just ids
                res.send(board.teamMembers)
            }
        }
    });
})

router.delete('/api/boards/:id/assignment', passport.authenticate('jwt', { session: false }), async (req, res) => {
    boardModel.findById(req.params.id, async function (err, board) {
        if (err) { res.status(500).send(err) }
        else {
            if (!board) { res.status(404).send("No board found.") }
            else if (!board.teamMembers.includes(req.user._id)) {
                res.status(404).send("You don't have permissions to delete users from this board.")
            }
            else {
                // TODO: delete user from team members (except the case when the user is an owner)
                // TODO: return full user objects, not just ids
                res.send(board.teamMembers)
            }
        }
    })
})

// FOR TESTING

router.delete('/api/boards', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await boardModel.deleteMany()
        res.status(200).send("All boards successfully deleted.")
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router
