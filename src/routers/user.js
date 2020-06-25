const express = require('express')
const User = require('../model/User')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/users', async(req, res) => {
    const user = new User(req.body)
    try {
        console.log(user)
        await user.save()
        const token = user.createToken()
        console.log(user)
        res.status(201).send(user)

    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }

    // user.save().then((user) => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.send(e)
    // })
})

router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
        // User.find(req.body).then((users) => {
        //     res.send(users)
        // }).catch((e) => {
        //     res.status(404).send()
        // })
})

router.get('/users/:id', async(req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }

    // User.findById(_id).then((user) => {
    //     console.log(!user)
    //     if (user.length === 0) {
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()

    // })
})

router.patch('/users/:id', async(req, res) => {
    const validupdate = ['name', 'email', 'age', 'password']
    const updates = Object.keys(req.body)
    const isvalid = updates.every((update) => {
        return validupdate.includes(update)
    })
    if (!isvalid) {
        return res.status(400).send('updation invalid')
    }
    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()


        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {

        res.status(400).send()
    }
})

router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user)
            return res.status(404).send()
        res.send(user)

    } catch (e) { res.status(500).send() }
})

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.createToken()

        res.send(user)
    } catch (e) {
        console.log(e)
        res.status(400).send()

    }

})

module.exports = router