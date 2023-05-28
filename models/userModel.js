const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs')

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
        validate: {
                validator: function(el){
                    return el === this.password
                },
                message: 'password are not same'
                
        }
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User