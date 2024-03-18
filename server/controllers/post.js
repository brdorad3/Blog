const Post = require("../models/post");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const axios = require("axios");

exports.create_post = [
    body("title").isLength({min:2, max:30}).escape().withMessage("Title of the post must be specified"),
    body("content").isLength({min:2, max:200}).escape().withMessage("Content of the post must be specified"),
    asyncHandler(async(req, res, next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({ errors: errors.array() });
        }else{
            const post = new Post({
                title: req.body.title, 
                content: req.body.content,
            })
        }
    })
]