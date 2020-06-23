const mongoose = require('mongoose')
require('../src/db/mongoose')
const Task = require('../src/model/Task')

// const _id = '5ef1cbc1ce43cb1d56784c17'
// Task.findByIdAndDelete(_id).then((task) => {
//     console.log(!task)
//     return Task.countDocuments({ complete: true })
// }).then((tasks) => {
//     console.log(tasks)
// })

const delete_task = async(id) => {
    const task = await Task.findByIdAndDelete(id)
    console.log(task)
    const count = await Task.countDocuments({ complete: true })
    return count
}

delete_task('5ef1cb82422cb41d00392016').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log('error')
})