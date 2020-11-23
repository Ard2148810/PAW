const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
})

userSchema.methods.validPassword = async function(password) {
    const user = this
    const compare = await bcrypt.compare(password, user.password)

    return compare
}

userSchema.pre('save', async function(next) {
    if (this.password) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.hashPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10)

    return hash
}

const User = mongoose.model("User", userSchema)
module.exports = User