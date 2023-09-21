const express = require('express');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); 
});

// mongoose.connect('mongodb://127.0.0.1:27018/mystuff')
mongoose.connect('mongodb+srv://oluconquer:kFnpRl3DhSFIUbK5@oluconquer.jyksbsn.mongodb.net/mystuff?retryWrites=true&w=majority')
.then(() => {
    // console.log('Successfully connected to MongoDB Community Server!');
    console.log('Successfully connected to MongoDB Community Atlas!')
})
.catch((error) => {
    // console.log('Unable to connect to MongoDB Community Server!');
    console.log('Unable to connect to MongoDB Community Atlas!');
    console.error(error);
});

// register stuff router with app
app.use('/api/stuff', stuffRoutes);

// register user authentication router app
app.use('/api/auth', userRoutes);

module.exports = app;