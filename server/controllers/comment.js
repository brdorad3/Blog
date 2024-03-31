const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.create_get = asyncHandler(async(req, res, next)=>{
    const postId = req.params.postId;
    
    const comments = await Comment.find({post: postId}).populate("author").sort({date: 1}).exec();
    console.log(comments)
    res.json(comments)
})

exports.create_post = [
    body("content").isLength({min:1, max:50}).escape().withMessage("Content must be specified"),
    asyncHandler(async(req, res, next)=>{
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors)
            res.json(errors);
        }
        try{
        const comment = new Comment({
            post: req.body.post,
            author: req.body.user,
            content: req.body.content
        })
        await comment.save();
        res.status(201).json(comment);
    }catch(e){
        console.error('Error saving post:', e);
    res.status(500).json({ e: 'Internal server error' });
    }
    })
]