const mongoose = require("mongoose")

const Schema = mongoose.Schema;


const commentSchema = new Schema({
    username: {
        type:String, 
        required: true
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

module.exports = mongoose.model("User", userSchema)