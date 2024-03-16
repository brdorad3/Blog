const User = require("../models/user")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const axios = require("axios");
const bcrypt = require('bcryptjs');


exports.create_get = asyncHandler(async(req, res, next)=>{
    
    res.json({data1: "ok", data2: "ccc"});
})

exports.create_post = [
    body("username").isLength({min:1}).escape().withMessage("Username must be specified"),
    body("email").isLength({min:1}).withMessage("Email must be specified").isEmail().withMessage("Please enter valid email")
    .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error("Email is already in use");
        }
    }).escape(),
    body("password").isLength({min:8}).escape().withMessage("Password must be specified").isStrongPassword().withMessage("Please enter valid password"),
    asyncHandler(async(req, res, next)=>{
        
        console.log(req.body)
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            
            res.status(400).json({ errors: errors.array() });
        }
        try{
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        
        await user.save();
        res.status(201).json({ user });
    }catch(e){
        console.error('Error saving user:', e);
    res.status(500).json({ e: 'Internal server error' });
    }
   } )
]
