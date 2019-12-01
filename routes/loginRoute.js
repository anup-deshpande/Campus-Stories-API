const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const {loginValidation} = require('../validation');


// Login with existing user
router.post('/', async (req,res) => {

    //  Validate the input
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send({
        "message": error.details[0].message
    })

    // Check if the user exist in the database
    const user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send({
        "message": 'Email does not exist'
    });

    // Check if password is correct
    const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
    if (! isCorrectPassword) return res.status(400).send({
        "message" : 'Invalid password'
    });

    // Create and assign a token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
    
    res.header('authorization', token).send({
        "id": user._id,
        "token":token
    })
  
    
});

module.exports = router