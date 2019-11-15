const router = require('express').Router();
const User = require('../model/User');
const Post = require('../model/Post');
const verify = require('./verifyToken');
const {addPostValidation, getPostValidation} = require('../validation');

// Get Routes
// Get posts with university name
router.get('/',verify,async (req,res) =>{

    //  Validate the input
    const {error} = getPostValidation(req.body);
    
    if(error) return res.status(400).send({
        "message" : error.details[0].message
    });

    const posts = await Post.find({"university":req.body.university});
    res.send(posts);
});


// Post Routes
router.post('/addPost',verify,async (req,res) =>{
    
    //  Validate the input
    const {error} = addPostValidation(req.body);
    if(error) return res.status(400).send({
        "message" : error.details[0].message
    })
    
    // Get User university 
    const user = await User.findOne({ _id: req.user}).select("university");
    
    // Create new post
    const post = new Post({
        author: req.user,
        title:req.body.title,
        description: req.body.description,
        university: user.university
    });

    // Save the post to database
    try{
        const savedPost = await post.save();
        res.status(200).send({
            "message" : 'Post added successfully'
        });
        
 
    }catch(err){
        res.status(400).send({
            "message" : err
        });
    }

   
});


module.exports = router;