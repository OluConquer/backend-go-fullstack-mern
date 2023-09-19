const express = require('express');
const Thing = require('../models/thing');

const router = express.Router();

// Saving Things for sale  to the Database
router.post('/', (req, res, next) => {
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

router.get('/:id', (req, res, next) => {
    Thing.findOne({_id: req.params.id})
    .then((thing) => {
        res.status(200).json(thing);
    })
    .catch((error) => {
        res.status(404).json({error: error});
    });
});

// Updating an Existing Thing
router.put('/:id', (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });

    Thing.updateOne({_id: req.params.id}, thing)
    .then( () => {
        res.status(201).json({message: 'Thing updated succesfully!'});
    })
    .catch( (error) => {
        res.status(400).json({error: error});
    });
});

// Deleting an Existing Thing
router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id})
    .then( () => {
        res.status(200).json({message: 'Deleted!'});
    })
    .catch( (error) => {
        res.status(400).json({error: error});
    });
});

// Retrieving the List of all Things for Sale

// router.use('', (req, res, next) => { /* THIS LINE CAUSED CORS ERRORS THAT TOOK A WHOLE DAY TO DEBUG */
router.get('/', (req, res, next) => {
    Thing.find()
    .then((things) => {
        res.status(200).json(things);
    })
    .catch((error) => {
        res.status(400).json({error: error});
    });
});

module.exports = router;