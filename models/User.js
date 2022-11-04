const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: 'user'

    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

//Encrypting password before saving user
//pre means before saving, there has to do something
UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next();
    }
    //10 is the length of the hashed password
    this.password = await bcrypt.hash(this.password, 10)
})

//Compare user password (entered password and the current password stored in the database)
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Return JSON Web Token and its time validity
UserSchema.methods.getJwtToken = function () {
    //id of the user that will be stored as payload
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

module.exports = mongoose.model('User', UserSchema);