const express = require('express');

const app = express();

app.use('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'aholiabbezeleel1',
            title: 'My first thing',
            description: 'All of the info about my first thing',
            imageUrl: '',
            price: 4900,
            userId: 'phineas'
        },
        {
            _id: 'aholiabbezeleel12',
            title: 'My second thing',
            description: 'All of the info about my second thing',
            imageUrl: '',
            price: 2900,
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


