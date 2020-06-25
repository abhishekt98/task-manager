const mongoose = require('mongoose')
const task_schema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    complete: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', task_schema)

module.exports = Task