const mongoose = require('mongoose') // database connection
var Schema = mongoose.Schema;

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
    images:[{
        type: String,
        trim: true
    }],
    category:{
        type: Schema.ObjectId, 
        ref: 'category'
    },
    subcategory:{
        type: Schema.ObjectId, 
        ref: 'subCategory'
    },
    description:{
        type:String,
        trim:true
    }
  });

  module.exports = product