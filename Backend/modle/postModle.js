const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    email:String
}, {
    versionKey: false
});

const PostModle = mongoose.model("posts", postSchema)


module.exports = { PostModle }