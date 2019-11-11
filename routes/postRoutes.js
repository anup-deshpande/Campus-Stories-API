const router = require('express').Router();
const Post = require('../model/Post');
const verify = require('./verifyToken');
const {addPostValidation} = require('../validation');

// Get Routes
router.get('/',verify,(req,res) =>{
    res.send(req.user);
});


// Post Routes
router.post('/addPost',verify,async (req,res) =>{
    
    //  Validate the input
    const {error} = addPostValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    
    // Create new post
    const post = new Post({
        author: req.user,
        title:req.body.title,
        description: req.body.description
    });

    try{
 
        const savedPost = await post.save();
        res.send(savedPost);
 
    }catch(err){
        res.status(400).send(err);
    }

   
});


module.exports = router;