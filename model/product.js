const mongoose = require('mongoose') // database connection
const product = mongoose.model('product', {   
    name: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: String,
        trim: true
    },
    specification: {
        type: String,
        require: true,
        trim: true
    },
    slug:{
        type: String,
        require: true,
        trim: true
    },
    image:[{
    image:{
        type:String,
        trim:true
    }}],
    category_id:{
        type: Schema.ObjectId, 
        ref: 'category'
    },
    subcategory_id:{
        type: Schema.ObjectId, 
        ref: 'subcategory'
    },
    description:{
        type:String,
        trim:true
    },
    rating:[{
        reviewBy: {
            type: Schema.ObjectId, 
            ref: 'user' 
            },
        rating: {
            type: Number,
            trim: true
        },
        comment:{
            type:String,
            trim:true
        }
    }]
  });

  module.exports = product