const express = require('express')
const bodyParser = require('body-parser');
const mongoose =  require('mongoose')

const url = 'mongodb://127.0.0.1:27017/crudnodejs'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const con = mongoose.connection

con.on('open', ()=>{
    console.log('connected ...')
})

const userRouter = require('./routes/users')
app.use('/', userRouter)


app.listen(9000, ()=>{
    console.log("Server Started at Port 9000")
})