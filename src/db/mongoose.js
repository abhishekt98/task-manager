const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})


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