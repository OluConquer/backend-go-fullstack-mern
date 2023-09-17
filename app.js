const express = require('express');
const mongoose = require('mongoose');
const Thing = require('./models/thing');

const app = express();

// mongoose.connect('mongodb+srv://<atlas db username>:<atlas pswd>@127.0.0.1:27018/?directConnection=false&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6')
mongoose.connect('mongodb://127.0.0.1:27018/mystuff')
.then(() => {
    console.log('Successfully connected to MongoDB Community Server!');
})
.catch((error) => {
    console.log('Unable to connect to MongoDB Community Server!');
    console.error(error);
});

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/stuff', (req, res, next) => {
    // console.log(req.body); // before implementing Thing model
    // res.status(201).json({message: 'Thing created successfully!'}); // before implementing Thing model
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId,
        price: req.body.price
    });

    thing.save()
    .then( () => {
        res.status(201).json({message: 'Post saved successfully!'});
    })
    .catch( (error) => {
        res.status(400).json({error: error});
    });
});

app.get('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'aholiabbezeleel1',
            title: 'My first thing',
            description: 'All of the info about my first thing',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Canon_EOS_60D_01.jpg',
            price: 4900,
            userId: 'phineas'
        },
        {
            _id: 'aholiabbezeleel12',
            title: 'My second thing',
            description: 'All of the info about my second thing',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Canon_EOS_60D_01.jpg',
            userId: 'nathan'
        }
    ];

    res.status(200).json(stuff);
});

/* MIDDLEWARE DEMO STARTS HERE 

app.use((req, res, next) => {
    console.log('Request Received!');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use( (req, res, next) => {
    res.json ({message: 'Your request was successful!'});
    next();
});

app.use((req, res, next) => {
    console.log('response sent successfully!');
    // next();
});

MIDDLEWARE DEMO STARTS HERE */

module.exports = app;


