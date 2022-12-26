const express=require('express');
const app=express();
const mongoose=require('./db/dbmodel')
const myClass = require('./Model/class')
const student=require('./Model/student')

app.use(express.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods","GET,POST,HEAD,OPTIONS,PUT,DELETE")
    res.header("Access-Control-Allow-Headers","Origin","X-Requested-With","Content-Type","Accept")
    next()
})

app.post("/v1/myClass",(req,res)=>{
     (new myClass({
        'className':req.body.className,
        'numberOfStudents':req.body.numberOfStudents
    })).save().then((myClass)=>res.send(myClass))
    .catch((err)=>console.log(err))    
})

app.post("/v1/myClass/:myClassId/students",(req,res)=>{
       (new student ({'name':req.body.name,'lastName':req.body.lastName,'_classId':req.params.myClassId}))
       .save().then((student)=>res.send(student))
       .catch((err)=>console.log(err))
})

app.get("/v1/myClass",(req,res)=>{
    myClass.find({}).then(myClass=>res.send(myClass))
    .catch((err)=>console.log(err))
})

app.get("/v1/myClass/:myClassId",(req,res)=>{
    myClass.findOne({ _id:req.params.myClassId })
    .then(myClass=>res.send(myClass)).catch((err)=>console.log(err))
})

app.get("/v1/myClass/:myClassId/students/:studentId",(req,res)=>{
    student.findOne({_classId:req.params.myClassId,_id:req.params.studentId})
    .then((onestudent)=>res.send(onestudent)).
    catch((err)=>console.log(err))
})

app.put("/v1/myClass/:myClassId/students/:studentId",(req,res)=>{
    student.findOneAndUpdate({'_id':req.params.myClassId,'_id':req.params.studentId},{$set:req.body})
    .then((student)=>res.send(student)).catch((err)=>console.log(err))
})

app.delete("/v1/myClass/:myClassId",(req,res)=>{
    const deleteStudents = (myClass)=>{
        student.deleteMany({ '_id':req.params.myClassId})
        .then(()=>myClass).catch((err)=>console.log(err))
    }
    myClass.findByIdAndDelete({'_id':req.params.myClassId}).then((myClass)=>res.send(deleteStudents(myClass)))
    .catch((err)=>console.log(err))
})

app.delete("/v1/myClass/:myClassId/students/:studentId",(req,res)=>{
    student.findOneAndDelete({_id:req.params.studentId,_classId:req.params.myClassId})
    .then((student)=>res.send(student)).catch((err)=>console.log(err))
})

app.listen(5000,()=>console.log("server started"))