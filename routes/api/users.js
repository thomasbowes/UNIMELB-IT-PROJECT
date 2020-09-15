const express = require('express');
const router = express.Router();

// Item Model
const Users = require('../../models/Users');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
    Users.find()
        .sort({date: -1})
        .then(users => res.json(users))
});

// @route POST api/items
// @desc Create A Post
// @access Public


// @route DELETE api/items/:id
// @desc Create A Item
// @access Public


module.exports = router;