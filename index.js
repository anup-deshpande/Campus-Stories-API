const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();


// Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();



// Connect to database
mongoose.connect(
process.env.DB_CONNECT,{ useNewUrlParser: true , useUnifiedTopology: true },() => 
    console.log('Connected to mongoDB!')
);


// Middleware
app.use(express.json());

// Route Middlewares
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

app.listen(80, () => console.log('Server up and running'));
