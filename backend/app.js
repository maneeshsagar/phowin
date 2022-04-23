const express=require('express')
const mogoose=require('mongoose')
require('./models/user')
require('./models/post')
const PORT=5000
const app=express()

// Database Connection
const {MONGOURI}=require('./keys')
mogoose.connect(MONGOURI,
    {
        useNewUrlParser: true 
    })
mogoose.connection.on('connected',()=>{
    console.log('Connected to the Database yeah')
})
mogoose.connection.on('error',(err)=>{
    console.log('getting error',err)
})
// Adding Routing 
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/postRoute'))
// Listening
app.listen(PORT,()=>{
    console.log('Server is running on '+PORT)
})