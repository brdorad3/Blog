const mongoose = require("mongoose")

const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type:String, 
        required: true
    },
    email: {
        type:email, 
        required: true
    },
    password: {
        type:password, 
        required: true
    },
})

module.exports = mongoose.model("User", userSchema)