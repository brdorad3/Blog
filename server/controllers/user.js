const User = require("../models/user")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.create_get = asyncHandler(async(req, res, next)=>{
    
    res.json({data1: "adfawegfs", data2: "cc"});
})

exports.create_post = [
    body("username").isLength({min:1}).escape().withMessage("Username must be specified"),
    body("email").isLength({min:1}).escape().withMessage("Email must be specified").isEmail().withMessage("Please enter valid email"),
    body("password").isLength({min:8}).escape().withMessage("Password must be specified").isStrongPassword().withMessage("Please enter valid password"),
    asyncHandler(async(req, res, next)=>{
        
        const errors = validationResult(req);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        if(!errors.isEmpty()){
          
            res.json(errors)
        }else{
        await user.save();
        res.json({user})
        res.redirect("/")
   } })
]
