const express = require('express');
const mongoose = require('mongoose');
const Thing = require('./models/thing');
// const cors = require('cors');

const app = express();

app.use(express.json());

// Configure CORS to allow requests from localhost:4200
// const corsOptions = {
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
// };
  
//   app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); 

    // Handle preflight requests (OPTIONS)
    // if (req.method === 'OPTIONS') {
    //     res.status(204).end(); // Respond with a 204 No Content status for preflight requests
    // } else {
    //     next(); // Continue processing other requests
    // }
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
  
// Saving Things for sale  to the Database
app.post('/api/stuff', (req, res, next) => {
    // console.log(req.body); // before implementing Thing model
    // res.status(201).json({message: 'Thing created successfully!'}); // before implementing Thing model
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });

    thing.save().then(
         () => {
        res.status(201).json({message: 'Post saved successfully!'});
    })
    .catch( 
        (error) => {
        res.status(400).json({
            error: error
        });
    }
    );
});

// Retrieving a Specific Thing

app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({_id: req.params.id})
    .then((thing) => {
        res.status(200).json(thing);
    })
    .catch((error) => {
        res.status(404).json({error: error});
    });
});

// Retrieving the List of all Things for Sale

// app.use('/api/stuff', (req, res, next) => { /* THIS LINE CAUSED CORS ERRORS THAT TOOK A WHOLE DAY TO DEBUG */
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
    .then((things) => {
        res.status(200).json(things);
    })
    .catch((error) => {
        res.status(400).json({error: error});
    });
});

module.exports = app;

/* // START OF DUMMY 'STUFF DATABASE' BEFORE IMPLEMENTING THING MODEL FOR STUFF DATABASE
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

// END OF DUMMY 'STUFF DATABASE' BEFORE IMPLEMENTING THING MODEL FOR  STUFF DATABASE */


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

// module.exports = app;


