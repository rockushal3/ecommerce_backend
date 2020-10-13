const mongoose = require('mongoose') // database connection
var Schema = mongoose.Schema;

const subCategory = mongoose.model('subCategory', {   
    name: {
        type: String,
        trim: true
    },
    category:{
        type: Schema.ObjectId, 
        ref: 'category',
        require:true
    }
  });

  module.exports = subCategory