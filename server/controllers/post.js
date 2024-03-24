const Post = require("../models/post");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const axios = require("axios");


exports.create_get = asyncHandler(async(req, res, next)=>{
    const post = await Post.find().sort({Date: 1}).exec()
    res.json({post});
})

exports.create_post = [
    body("title").isLength({min:2, max:30}).escape().withMessage("Title of the post must be specified"),
    body("content").isLength({min:2, max:200}).escape().withMessage("Content of the post must be specified"),
    asyncHandler(async(req, res, next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({ errors: errors.array() });
        }try{
            const post = new Post({
                author: req.user,
                title: req.body.title, 
                content: req.body.content,
                isPublished: false
            })
            await post.save();
            res.status(201).json(post);
        }catch(e){
            console.error('Error saving post:', e);
    res.status(500).json({ e: 'Internal server error' });
        }
    })
]