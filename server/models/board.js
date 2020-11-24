const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    name: String,
    description: String,
    owner: String,
    teamMembers: [String],
});

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;