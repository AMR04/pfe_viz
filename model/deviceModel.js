var mongoose = require('mongoose')
var Schema = mongoose.Schema


var deviceSchema= new Schema({

    _id: {type :Schema.Types.ObjectId },

    devicename: {
        type: String,
        required: true
    },
    keyword: {
        type: String,
        required: true
    },
    state: {
        type:Boolean,
        //required: true
    },
    image: {
        type: String,
        required: true
    },
    bluename: {
        type: String,
 
    },

    blueadress: {
        type: String,
 
    },
    version: {
          type: String,
        required: true
        
      },
    current: {
        type:Number,
        //required: true
    },
    voltage: {
        type:Number,
        //required: true
    } ,
    speed: {
        type: Number,
        //required: true
    } , 
  
    user: [{
        type: Schema.Types.ObjectId,
       
          ref: 'User'
      }],
    tech: {
        type: Schema.Types.ObjectId,
       
          ref: 'Tech'
      },


})

module.exports = mongoose.model('Device', deviceSchema)