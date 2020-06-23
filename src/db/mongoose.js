const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })


// const Tasks = mongoose.model('Tasks', {
//     description: {
//         type: String

//     },
//     complete: {
//         type: Boolean,
//         validate(value) {
//             if (value == true) {
//                 throw new Error('what the fuck')
//             }
//         },
//         default: false
//     }
// })

// new Tasks({
//     description: " play",

// }).save().then(() => {}).catch((error) => {})