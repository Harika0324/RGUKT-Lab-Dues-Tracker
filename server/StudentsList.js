const mongoose=require("mongoose");

const studentDetailsSchema= new mongoose.Schema(
    {
        ID:String,
        Name:String,
        Class:String,
        Remarks:String,
    }
);

const students_datas=mongoose.model("students_data",studentDetailsSchema);
module.exports=students_datas;
