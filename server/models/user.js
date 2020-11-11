const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
});

userSchema.methods.validPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

userSchema.pre(
    'save',
    async function(next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        user.save()
        next();
    }
);


const User = mongoose.model("User", userSchema);
module.exports = User;