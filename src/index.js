const express = require('express')
const bcrypt = require('bcrypt')
require('./db/mongoose')
const User = require('./model/User')
    // const Task = require('./model/Task')

const port = process.env.PORT
const user_router = require('./routers/user')
const task_router = require('./routers/task')
const app = express()

// app.use((req, res, next) => {
//     res.status(503).send('site is at maintanance')
// })

app.use(express.json())
app.use(user_router)
app.use(task_router)

// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         // if (!file.originalname.endsWith('.pdf')) 
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             cb(new Error('upload a doc or docx file u bitch'))
//         }
//         cb(undefined, true)
//     }
// })

// app.post('/upload', upload.single('profile'), (req, res) => {
//     res.send()
// })

app.listen(port, () => {
    console.log('server listening at port' + port)
})


// const jwt = require('jsonwebtoken')

// const myfunc = async() => {
//     const token = jwt.sign({ _id: 'abhi' }, 'xx', { expiresIn: '1 seconds' })
//     console.log(token)
//     console.log(jwt.verify(token, 'xx'))
// }

// myfunc()