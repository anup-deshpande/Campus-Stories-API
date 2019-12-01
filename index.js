const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000;

// Import routes
const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoutes');
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
app.use('/api/login',loginRoute);
app.use('/api/users',userRoute);
app.use('/api/posts',postRoute);

app.listen(port, () => console.log('Server up and running'));

