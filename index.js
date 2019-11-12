const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000;

// Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/postRoutes');

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

app.listen(port, () => console.log('Server up and running'));

