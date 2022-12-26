const mongoose=require('mongoose');

const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    _classId:{
        type:mongoose.Types.ObjectId,
        required:true
    }
})

const Student = mongoose.model('Student',StudentSchema)
module.exports = Student;