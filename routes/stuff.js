const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

// Retrieving the List of all Things for Sale
router.get('/', auth, stuffCtrl.getAllStuff);

// Saving Things for sale  to the Database
router.post('/', auth, multer, stuffCtrl.createThing), 

// Retrieving a Specific Thing
router.get('/:id', auth, stuffCtrl.getOneThing);

// Updating an Existing Thing
router.put('/:id', auth, multer, stuffCtrl.modifyThing);

// Deleting an Existing Thing
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;