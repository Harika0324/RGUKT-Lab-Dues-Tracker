const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose=require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());
app.listen(8080, () => {
    console.log(`Server is running on port 8080.`);
  });


mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connection Successful");
}).catch((e)=>console.log(e));

const login=require("./Faculty.js");
const admin=require("./Administration.js");
const students_datas=require("./StudentsList.js");

app.post("/loginfaculty",async (req,res)=>{
    const {ID,Password}=req.body;
    // console.log(username,password);
    const fac=await login.find({ID});
    if(fac.length==0){
        return res.json("failure");
    }
    else if(Password==fac[0].Password){
        return res.json("success");
    }
    else{
        return res.json("failure");
    }
});

app.post("/loginadmin",async (req,res)=>{
    const {ID,Password}=req.body;
    // console.log(username,password);
    const fac=await admin.find({ID});
    if(fac.length==0){
        return res.json("failure");
    }
    else if(Password==fac[0].Password){
        return res.json("success");
    }
    else{
        return res.json("failure");
    }
});


app.get("/search",async(req,res)=>{
    const { ID } = req.query;
    try {
        const student = await students_datas.findOne({ID});
        console.log(student);
        if (student) {
            // Student found, return details
            res.json({
                message: 'Student found',
                student
            });
        } else {
            // Student not found
            res.status(404).json({
                message: 'Student not found'
            });
        }
    } catch (error) {
        // Error handling
        res.status(500).json({
            message: 'Error searching for student',
            error: error.message
        });
    }
});


app.put('/updateRemarks', async (req, res) => {
    const { ID } = req.query;
    const { remarks } = req.body;

    try {
         // Find the student with the provided ID
         let student = await students_datas.findOne({ ID });

         if (!student) {
             return res.status(404).json({
                 message: 'Student not found'
             });
         }
 
         // Append the new remarks to the existing remarks
         student.Remarks = student.Remarks ? student.Remarks + ' ' + remarks : remarks;
         await student.save();
 
         // Respond with the updated student
         res.json({
             message: 'Remarks updated successfully',
             student
         });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating remarks',
            error: error.message
        });
    }
});


app.put('/clearRemarks', async (req, res) => {
    const { ID } = req.query;
    const { remarks } = req.body;
    try {
        // Update remarks for the student with the provided ID
        const updatedStudent = await students_datas.findOneAndUpdate({ ID }, { Remarks:remarks }, { new: true });

        if (updatedStudent) {
            res.json({
                message: 'Remarks updated successfully',
                student: updatedStudent
            });
        } else {
            res.status(404).json({
                message: 'Student not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating remarks',
            error: error.message
        });
    }
});