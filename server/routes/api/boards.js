var express = require('express')
var passport = require('passport')
const boardModel = require('../../models/board')
var router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    Board:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        owner:
 *          type: string
 *        teamMembers:
 *          type: array
 *          items:
 *            type: string
 *    BoardPost:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        description:
 *          type: string
 */

/**
 * @swagger
 * /api/boards:
 *  get:
 *    tags:
 *      - Boards
 *    description: Returns all user's boards
 *    produces:
 *      - application/json
 *    parameters: []
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Board'
 *      '401':
 *        description: Unauthorized
 *      '500':
 *        description: Internal server error
 */
router.get('/api/boards', passport.authenticate('jwt', { session: false }), async (req, res) => {
    boardModel.find({ teamMembers: req.user._id }, async function (err, boards) {
        if (err) { res.status(500).send(err) }
        else { res.status(200).send(boards) }
    });
})

/**
 * @swagger
 * /api/boards/{id}:
 *  get:
 *    tags:
 *      - Boards
 *    description: Returns a single board
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: _id
 *        description: Board ID
 *        in: path
 *        required: true
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Board'
 *      '401':
 *        description: Unauthorized
 *      '403':
 *        description: Forbidden
 *      '404':
 *        description: Not found
 *      '500':
 *        description: Internal server error
 */
router.get('/api/boards/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    boardModel.findById(req.params.id, async function (err, board) {
        if (err) { res.status(500).send(err) }
        else {
            if (!board) { res.status(404).send("No board found.") }
            else if (!board.teamMembers.includes(req.user._id)) {
                res.status(403).send("You don't have permissions for this board.")
            }
            else { res.status(200).send(board) }
        }
    });
})

/**
 * @swagger
 * /api/boards:
 *  post:
 *    tags:
 *      - Boards
 *    description: Creates a new board
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "A board object"
 *        required: true
 *        schema:
 *          $ref: '#/components/schemas/BoardPost'
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Board'
 *      '401':
 *        description: Unauthorized
 *      '500':
 *        description: Internal server error
 */
router.post('/api/boards', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const board = new boardModel(req.body);
    board.owner = req.user._id
    board.teamMembers = [req.user._id]

    try {
        await board.save()
        res.status(200).send(board)
    } catch (err) {
        res.status(500).send(err)
    }
})

/**
 * @swagger
 * /api/boards/{id}:
 *  put:
 *    tags:
 *      - Boards
 *    description: Modifies a board
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "A board object"
 *        required: true
 *        schema:
 *          $ref: '#/components/schemas/BoardPost'
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Board'
 *      '401':
 *        description: Unauthorized
 *      '403':
 *        description: Forbidden
 *      '404':
 *        description: Not found
 *      '500':
 *        description: Internal server error
 */
router.put('/api/boards/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    //put for name (owner), put for content (teammembers), restrict not to change owner
    boardModel.findById(req.params.id, async function (err, board) {
        if (err) { res.status(500).send(err); }
        else {
            if (!board) { res.status(404).send("No board found."); }
            else if (!board.teamMembers.includes(req.user._id)) {
                res.status(403).send("You don't have permissions for this board.")
            } else {
                if(req.body.content) {
                    board.content = req.body.content;
                    board.save();
                }
                if (req.body.name) {
                    if (board.owner !== req.user._id) {
                        res.status(403).send("You don't have permissions to change name of board. " +
                            "Only the owner can change name of board.")
                    } else {
                        board.name = req.body.name;
                    }
                }
                res.status(200).send(board)
            }
        }
    });
})

/**
 * @swagger
 * /api/boards/{id}:
 *  delete:
 *    tags:
 *      - Boards
 *    description: Deletes a single board, provided the user is an owner of the board
 *    produces:
 *      - application/json
 *    parameters: []
 *    responses:
 *      '200':
 *        description: OK
 *      '401':
 *        description: Unauthorized
 *      '403':
 *        description: Forbidden
 *      '404':
 *        description: Not found
 *      '500':
 *        description: Internal server error
 */
router.delete('/api/boards/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    boardModel.findById(req.params.id, async function (err, board) {
        if (err) { res.status(500).send(err) }
        else {
            if (!board) { res.status(404).send("No board found.") }
            else if (board.owner !== req.user._id) {
                res.status(403).send("You don't have permissions to delete this board. " +
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
