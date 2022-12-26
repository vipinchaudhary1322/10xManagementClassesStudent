const mongoose=require('mongoose');

const ClassSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    numberOfStudents:{
        type:Number,
        trim:true
    }
})

const Class = mongoose.model('Class',ClassSchema)
module.exports = Class;