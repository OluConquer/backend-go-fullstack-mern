const Thing = require('../models/thing');
const fs = require ('fs');

// Saving Things for sale  to the Database
exports.createThing = (req, res, next) => {
    req.body.thing = JSON.parse(req.body.thing);
    const url = req.protocol + '://' + req.get('host');
    const thing = new Thing({
        title: req.body.thing.title,
        description: req.body.thing.description,
        imageUrl: url + '/images/' + req.file.filename,
        price: req.body.thing.price,
        userId: req.body.thing.userId
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
};

// Retrieving a Specific Thing
exports.getOneThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
    .then((thing) => {
        res.status(200).json(thing);
    })
    .catch((error) => {
        res.status(404).json({error: error});
    });
};

// Updating an Existing Thing
exports.modifyThing = (req, res, next) => {
    let thing = new Thing({_id: req.params._id});
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.thing = JSON.parse(req.body.thing);
        thing = {
            _id: req.params.id,
            title: req.body.thing.title,
            description: req.body.thing.description,
            imageUrl: url + '/images/' + req.file.filename,
            price: req.body.thing.price,
            userId: req.body.thing.userId
        };
    } else {
        thing = {
            _id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            userId: req.body.userId
        };
    }    

    Thing.updateOne({_id: req.params.id}, thing)
    .then( () => {
        res.status(201).json({message: 'Thing updated succesfully!'});
    })
    .catch( (error) => {
        res.status(400).json({error: error});
    });
};

// Deleting an Existing Thing
exports.deleteThing = (req, res, next) => {
    // check the userId of the thing against the Id of the user making the request to ensure only yhe owner of a thing can delete it!
    Thing.findOne({_id: req.params.id})
    .then((thing) => {
        const filename = thing.imageUrl.split('/images/')[1];
        
        if(!thing) {
            return res.status(404).json({error: new Error('Thing not found!')});
        }
        if (thing.userId !== req.auth.userId) {
            res.status(401).json({error: new Error('unauthorized request!')});
        }

        fs.unlink('images' + filename, () => {
            Thing.deleteOne({_id: req.params.id})
            .then( () => {
                res.status(200).json({message: 'Deleted!'});
            })
            .catch( (error) => {
                res.status(400).json({error: error});
            });
        });
    });
};

// Retrieving the List of all Things for Sale
exports.getAllStuff = (req, res, next) => {
    Thing.find()
    .then((things) => {
        res.status(200).json(things);
    })
    .catch((error) => {
        res.status(400).json({error: error});
    });
};