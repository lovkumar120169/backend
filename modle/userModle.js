const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    password: String
},{
    versionKey:false
});

const UserModle=mongoose.model("users3",userSchema)


module.exports={UserModle}