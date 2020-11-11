const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    name: String,
    description: String,
    owner: String,
    teamMembers: [String],
    guests: [String],
});

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;