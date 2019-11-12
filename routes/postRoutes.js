const router = require('express').Router();
const Post = require('../model/Post');
const verify = require('./verifyToken');
const {addPostValidation} = require('../validation');

// Get Routes
// Get posts with university name
router.get('/',verify,async (req,res) =>{
    console.log(req.body.university);
    const posts = await Post.find({"university":req.body.university});
    console.log(posts);
    res.send(req.user);
});


// Post Routes
router.post('/addPost',verify,async (req,res) =>{
    
    //  Validate the input
    const {error} = addPostValidation(req.body);
    if(error) return res.status(400).send({
        "message" : error.details[0].message
    })
    
    // Create new post
    const post = new Post({
        author: req.user,
        title:req.body.title,
        description: req.body.description
    });

    // Save the post to database
    try{
        const savedPost = await post.save();
        res.send(savedPost);
 
    }catch(err){
        res.status(400).send({
            "message" : err
        });
    }

   
});


module.exports = router;