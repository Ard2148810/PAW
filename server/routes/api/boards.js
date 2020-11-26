var express = require('express')
const { use } = require('passport')
var passport = require('passport')
const boardModel = require('../../models/board')
const userModel = require('../../models/user')
var router = express.Router()

router.get('/api/boards', passport.authenticate('jwt', { session: false }), async (req, res) => {
    boardModel.find({ teamMembers: req.user._id }, async function (err, board) {
        if (err) { res.status(500).send(err) }
        else { res.status(200).send(board) }
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
    //put for name (owner), put for content (teammembers), restrict not to change owner
    boardModel.findById(req.params.id, async function (err, board) {
        if (err) { res.status(500).send(err); }
        else {
            if (!board) { res.status(404).send("No board found."); }
            else {
                if (req.body.content) {
                    board.content = req.body.content;
                    board.save();
                }
                if (req.body.name) {
                    if (board.owner !== req.user._id) {
                        res.status(404).send("You don't have permissions to change name of board. " +
                            "Only the owner can change name of board.")
                    } else {
                        board.name = req.body.name;
                    }
                }
                res.send(board);
            }
        }
    });
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
            else if (board.owner !== req.user._id) {
                res.status(404).send("You don't have permissions to assign users to this board.")
            }
            else {
                req.body.users.forEach(element => {

                    board.teamMembers.push(element);
                });
                // // TODO: return full user objects, not just ids
                // var userList = await Promise.all(board.teamMembers.map( element => {
                //     userModel.findById({ _id: element }, async function (err, user) {
                //         if (err) { console.log(err); }
                //         else {
                //            return user;
                //         }
                //     })
                // }));
                // res.status(200).send(userList);
                board.save();
                res.status(200).send(board.teamMembers);
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
                if (req.body.user) {
                    if (board.owner._id === req.body.user) res.status(404).send("You can't delete the owner");
                    board.teamMembers.splice(board.teamMembers.indexOf(req.body.user), 1);
                    // TODO: return full user objects, not just ids
                    res.status(200).send(board.teamMembers);
                }
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
