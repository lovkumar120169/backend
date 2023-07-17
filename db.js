const mongoose=require("mongoose")

const connection=mongoose.connect("mongodb+srv://luv:kumar@cluster0.e5ouqwp.mongodb.net/usersEval4?retryWrites=true&w=majority")

module.exports={connection}