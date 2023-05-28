const mongoose = require('mongoose')
const validator = require('validator');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is must be fill']
    },
    email: {
        type: String,
        required: [true, 'email must be provide'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please confirm password'],
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User