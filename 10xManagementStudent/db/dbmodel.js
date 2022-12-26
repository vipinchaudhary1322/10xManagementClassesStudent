const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
},()=>console.log("DB Connected"))

module.exports = mongoose ;