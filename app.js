const express = require('express');
// const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({message: 'Thing created successfully!'});
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


