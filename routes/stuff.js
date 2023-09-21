const express = require('express');
const Thing = require('../models/thing');

const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

// Saving Things for sale  to the Database
router.post('/', stuffCtrl.createThing), 

// Retrieving a Specific Thing
router.get('/:id', stuffCtrl.getOneThing);

// Updating an Existing Thing
router.put('/:id', stuffCtrl.modifyThing);

// Deleting an Existing Thing
router.delete('/:id', stuffCtrl.deleteThing);

// Retrieving the List of all Things for Sale
router.get('/', stuffCtrl.getAllStuff);

module.exports = router;