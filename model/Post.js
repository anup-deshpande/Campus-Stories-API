const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    author:{
        type: String,
        required: true  
    },
    title:{
        type: String,
        required: true,
        min: 4,
        max: 1000
    },
    description:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    university:{
        type: String,
        required: true
    }

},{ collection: 'posts' });

module.exports = mongoose.model('Post',postSchema);