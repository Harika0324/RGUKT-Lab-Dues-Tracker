const mongoose=require("mongoose");

const adminDetailsSchema= new mongoose.Schema(
    {
        ID:String,
        Password:String,
        Name:String,
    }
);

const admin=mongoose.model("admin",adminDetailsSchema);
module.exports=admin;
