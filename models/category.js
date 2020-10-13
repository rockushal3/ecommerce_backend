const mongoose = require('mongoose') // database connection

//attributes of database and create model
const category = mongoose.model('category', {   
    name: {
        type: String,
        trim: true
    }
  });

  module.exports = category