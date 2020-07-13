const express = require('express')
const User = require('../model/User')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/users', async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.createToken()

        res.status(201).send({ user, token })

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



router.patch('/users/me', auth, async(req, res) => {
    const validupdate = ['name', 'email', 'age', 'password']
    const updates = Object.keys(req.body)
    const isvalid = updates.every((update) => {
        return validupdate.includes(update)
    })
    if (!isvalid) {
        return res.status(400).send('updation invalid')
    }
    try {
        // const user = await User.findById(req.params.id)
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()


        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        res.send(req.user)
    } catch (e) {

        res.status(400).send('updation failed')
    }
})

router.delete('/users/me', auth, async(req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id)
        await req.user.remove()
        res.send(req.user)

    } catch (e) { res.status(500).send() }
})

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.createToken()

        res.send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(400).send()

    }

})

router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send('logout success')
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutall', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send('done')
    } catch (e) {
        res.status(500).send('error')
    }

})

module.exports = router