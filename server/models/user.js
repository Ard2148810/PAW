const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    hash_password: String,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;