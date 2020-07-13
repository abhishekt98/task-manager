const express = require('express')
const Task = require('../model/Task')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/tasks', auth, async(req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

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





router.get('/tasks', auth, async(req, res) => {
    const match = {
        owner: req.user._id
    }
    const sortBy = {}
    if (req.query.complete === 'true') {
        match.complete = true
    } else if (req.query.complete === 'false') {
        match.complete = false
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sortBy[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        const tasks = await Task.find(match).sort(sortBy).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip))
            // await req.user.populate({
            //     path: 'tasks',
            //     match,
            //     options: {   
            //          limit: 3
            // skip:
            // sort:{
            //     createdAt:-1
            // }
            //     }
            // }).execPopulate()

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

router.get('/tasks/:id', auth, async(req, res) => {



    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
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

router.patch('/tasks/:id', auth, async(req, res) => {
    const validupdate = ['description', 'complete']
    const updates = Object.keys(req.body)
    const isvalid = updates.every((update) => {
        return validupdate.includes(update)
    })
    if (!isvalid)
        return res.status(400).send('invalid update')
    try {
        //   const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task)
            return res.status(404).send()
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.delete('/tasks/:id', auth, async(req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task)
            return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router