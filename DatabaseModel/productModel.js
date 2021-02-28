const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId, ref: "users",
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    created_by:{
        type:String,
        required:true
    }

})
module.exports = product = mongoose.model('productDetails',productSchema)
