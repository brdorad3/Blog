const User = require("../models/user")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const bcrypt = require('bcryptjs');
const passport = require("passport");
const Post = require("../models/post");


exports.create_get = asyncHandler(async(req, res, next)=>{
    const user = await User.find({}).sort().exec();
    res.json({user});
})

exports.create_post = [
    body("username").isLength({min:1, max:20}).escape().withMessage("Username must be specified")
    .custom(async (value) => {
        const user = await User.findOne({ username: value });
        if (user) {
            throw new Error("Username is already in use");
        }
    }).escape(),
    body("email").isLength({min:1}).withMessage("Email must be specified").isEmail().withMessage("Please enter valid email")
    .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error("Email is already in use");
        }
    }).escape(),
    body("password").isLength({min:8}).escape().withMessage("Password must be specified").isStrongPassword().withMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
    asyncHandler(async(req, res, next)=>{
        
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            
            res.status(400).json({ errors: errors.array() });
        }
        try{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        
        await user.save();
        res.status(201).json({ user });
    }catch(e){
        console.error('Error saving user:', e);
    res.status(500).json({ e: 'Internal server error' });
    }
   } )
]
exports.log_in_get = asyncHandler(async(req, res, next)=>{
 

    res.json({user: req.user})
    
})
exports.log_in_post = asyncHandler(async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Internal server error' });
        }
        console.log('Login route!  Authenticated?:', req.isAuthenticated(), ' Session:', req.session);
        
        return res.json({ message: 'Login successfull', user:req.user });
        
      });
    })(req, res, next);
  });
exports.log_in_posts = asyncHandler(async(res, req, next)=>{
console.log(req.body)
})
