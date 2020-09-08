const mongoose = require('mongoose') // database connection
var Schema = mongoose.Schema;
const subcategory = mongoose.model('subcategory', {   
    name: {
        type: String,
        trim: true
    },
    category_id:{
        type: Schema.ObjectId, 
        ref: 'category',
        require:true
    }
  });

  module.exports = subcategory