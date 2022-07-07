const mongoose= require('mongoose');
const schema1=mongoose.Schema;

const ischema= new schema1({
    name: {
        type: String,
        required: true
    },
    build: {
        type: String,   
        required: true
    }
  
},{timestamps: true});



const Item=mongoose.model('Item', ischema)
module.exports= Item;