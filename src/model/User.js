const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowecase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email not exist')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password doesnot satisfie required property')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('age cannot be negative')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//authontication token
user_schema.methods.createToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'xx')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


//find by email and password
user_schema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email })

    if (!user) {

        throw new Error('unable to find mail')

    }
    const ismatch = await bcrypt.compare(password, user.password)

    if (!ismatch) throw new Error('password does not match')

    return user
}

//for hashing password
user_schema.pre('save', async function(next) {
    const user = this
    if (this.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', user_schema)

module.exports = User