const express = require('express')
require('./db/mongoose')
const User = require('./model/User')
const Task = require('./model/Task')
const port = process.env.PORT || 3000
const app = express()

app.use(express.json())



app.post('/users', async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.send(user)

    } catch (e) {
        res.status(400).send()
    }

    // user.save().then((user) => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.send(e)
    // })
})

app.post('/tasks', async(req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
    // task.save().then((task) => {
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })

})

app.get('/users', async(req, res) => {
    try {
        const users = await User.find(req.body)
        res.send(users)
    } catch (e) {
        res.status(404).send()
    }
    // User.find(req.body).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(404).send()
    // })
})

app.get('/users/:id', async(req, res) => {
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

app.get('/tasks', async(req, res) => {
    try {
        const tasks = await Task.find(req.body)
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
    // Task.find(req.body).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(404).send()
    // })
})

app.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
    // Task.findById(_id).then((task) => {
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})
app.listen(port, () => {
    console.log('server listening ata port' + port)
})