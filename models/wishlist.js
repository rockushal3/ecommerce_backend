const mongoose = require('mongoose') // database connection
const wishlist = mongoose.model('wishlist', {   
  
    user_id:{
        type: Schema.ObjectId, 
        ref: 'user',
        require:true
    },
    product_id:{
        type: Schema.ObjectId, 
        ref: 'product',
        require:true
    }
  });

  module.exports = wishlist