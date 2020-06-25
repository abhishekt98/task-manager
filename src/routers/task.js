const express = require('express')
const Task = require('../model/Task')

const router = express.Router()

router.post('/tasks', async(req, res) => {
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





router.get('/tasks', async(req, res) => {
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

router.get('/tasks/:id', async(req, res) => {



    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task)
            return res.status(404).send()

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

router.patch('/tasks/:id', async(req, res) => {
    const validupdate = ['description', 'complete']
    const updates = Object.keys(req.body)
    const isvalid = updates.every((update) => {
        return validupdate.includes(update)
    })
    if (!isvalid)
        return res.status(400).send('invalid update')
    try {
        //   const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        if (!task)
            return res.status(404).send()
        res.send(task)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task)
            return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router