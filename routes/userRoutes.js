const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const {signUpValidation} = require('../validation');


//  Create a new user
router.post('/', async (req,res) => {
    
    //  Validate the input
    const {error} = signUpValidation(req.body);
    if(error) return res.status(400).send({
        "message": error.details[0].message
    })
    

    // Check if the user already exist
    const emailExist = await User.findOne({ email: req.body.email});
    if(emailExist) return res.status(400).send({
        "message":"User already exist. Please login to continue"
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password: hashPassword,
        university: req.body.university
    });

    try{

        const savedUser = await user.save();
        res.send({
            "message": "User is created"
        });

    }catch(err){
        res.status(400).send({
            "message": err
        });
    }

    
});

module.exports = router;