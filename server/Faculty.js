const mongoose=require("mongoose");

const facultyDetailsSchema= new mongoose.Schema(
    {
        ID:String,
        Password:String,
        Name:String,
    }
);

const login=mongoose.model("login",facultyDetailsSchema);
module.exports=login;
