const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSChema = new Schema({
    email:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Shop_name:{
        type:String,
        required:true
    },
    Phone_number:{
        type:String,
        required:true
    }
})

module.exports = item = mongoose.model('users',userSChema)