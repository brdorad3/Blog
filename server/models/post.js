const mongoose = require("mongoose")

const Schema = mongoose.Schema;


const postSchema = new Schema({
    author: {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    comment: [{
        type : Schema.Types.ObjectId,
        ref : "Comment"
    }],
    title: {
        type:String, 
        required: true
    },
    content: {
        type:String, 
        required: true
    },
    Date: {
        type: Date, 
        required: true, 
        default: Date.now()
    },
    isPublished: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model("Post", postSchema)