var mongoose = require('mongoose');
Schema = mongoose.Schema

var  techSchema =  new Schema(

    { //_id: Schema.Types.ObjectId ,
        
        
        techname: {
        type: String,
        required: true
                 },
        password: {
            type: String,
            required: true
        },
        secteur: {
            type:String,
        },
        phone:{
            type:Number
        }
      
    }
    
)

module.exports = mongoose.model('Tech', techSchema );