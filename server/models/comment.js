const mongoose = require("mongoose")

const Schema = mongoose.Schema;


const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    post: {
        type: Schema.Types.ObjectId, 
        ref: "Post"
    },
    content: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Comment", commentSchema)