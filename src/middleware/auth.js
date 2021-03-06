const User = require('../model/User')
const jwt = require('jsonwebtoken')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        req.token = token
        req.user = user
        if (!user) throw new Error()
        next()
    } catch (e) {
        res.status(401).send('not authorized')
    }
}

module.exports = auth