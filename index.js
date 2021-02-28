const express = require('express');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const mongoose = require('mongoose');
// const storage = multer.diskStorage({
//     destination: function(req,file, cb){
//         cb( null,'./uploads/')
//     },
//     filename:function(req,file,cb){
//         cb( null,new Date().toISOString() + file.originalname)
//     }
// })
// const upload = multer({storage:storage});

const app = express()
app.use(express.json())

const Serverport = process.env.port

const DatabaseConnection = require('./connection/connect')
const userDB = require('./DatabaseModel/userModel')
const productDB = require('./DatabaseModel/productModel')

// for the user registeration 
const user = express.Router()
app.use('/',user)
require('./auth/register')(user,userDB)

const userLogin = express.Router()
app.use('/',userLogin)
require('./auth/loginSystem')(userLogin,userDB,jwt,env)

const logout = express.Router()
app.use('/',logout)
require('./auth/logout')(logout,userDB)

const userDashboard = express.Router()
app.use('/',userDashboard)
require('./routes/userDashboard')(userDashboard,userDB,jwt,env, productDB,mongoose)

const homePage = express.Router()
app.use('/',homePage)
require('./routes/homePage')(homePage,userDB,productDB,mongoose)


app.listen(Serverport,()=>{
    console.log(`server is being started at ${Serverport} port number`)
})
