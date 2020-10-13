const mongoose = require('mongoose') // database connection
const order = mongoose.model('order', {   
    user_id:{
        type: Schema.ObjectId, 
        ref: 'user',
        require:true
    },
    items:[{
        product_id:{
            type: Schema.ObjectId, 
            ref: 'product',
            require:true
        },
        quantity:{
            type:Number,
            require:true
        }
    }],
    address:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    }
  },{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
  );

  module.exports = order