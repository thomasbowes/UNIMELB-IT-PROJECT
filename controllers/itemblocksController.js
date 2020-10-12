const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Point to the file storing environment variables, in order to use them in the nodejs app
dotenv.config({ path: './.env' });

const ItemBlock = require('mongoose').model('ItemBlock');

// Middleware passed to make sure that required contents of create request is present
const checkCreateBody = (req, res, next) => {
	// check if required fields for creating itemblock are present
	if (!req.body.user_id || !req.body.type || !req.body.title) {
		return res.status(401).json({
			status: "Missing either user id, type of item block, or its title"
		});
	}

	next();
};

// function for creating a new item block
const createItem = (req, res, next) => {
	// in the case if description body is not present
	if (!req.body.description) {
		req.body.description = "";
	}

	const newItem = new ItemBlock({
		user_id: req.body.user_id,
		type: req.body.type,
		title: req.body.title,
		description: req.body.description
		// not sure if this should be added
		// urlThumbnail: req.body.urlThumbnail
	});

	newItem
		.save()
		.then(() => {
			res.status(201).json({
				status: "Item block has been successfully created",
				item: newItem
			});
		})
		.catch(error => {
			res.status(500).json({
				status: "An error has occurred trying to create an item block",
				err: error
			});
		});
};

// Middleware passed to make sure that required contents of update request is present
const checkUpdateBody = (req, res, next) => {
	// check if required fields for updating itemblock are present
	if (!req.body.user_id || !req.body.item_id || !req.body.change) {
		return res.status(401).json({
			status: "Missing either user id, item id, or the body of change"
		});
	}

	next();
};

// function for updating a particular item block
const updateItem = (req, res, next) => {
	const itemid = req.body.item_id;
	// query represents which value we're using to search the database
	const query = { _id: itemid };

	ItemBlock
		// req.body.change is an object that contains the fields we want to change in an item block
		.findOneAndUpdate(query, req.body.change, {upsert: true})
		.then(item => {
			res.status(200).json({
				status: "Item block has been successfully updated"
			});
		})
		.catch(error => {
			res.status(500).json({
				status: "An error has occurred trying to update an item block",
				err: error
			});
		});
};

// Middleware passed to make sure that required contents of delete request is present
const checkDeleteBody = (req, res, next) => {
	// check if required fields for deleting itemblock are present
	if (!req.body.user_id || !req.body.item_id) {
		return res.status(401).json({
			status: "Missing either user id or item id"
		});
	}

	next();
};

// function for deleting a particular item block
const deleteItem = (req, res, next) => {
	const itemid = req.body.item_id;
	const query = { _id: itemid };

	ItemBlock
		.deleteOne(query)
		.then(() => {
			res.status(200).json({
				status: "Item block has been successfully deleted"
			});
		})
		.catch(error => {
			res.status(500).json({
				status: "An error has occurred trying to delete an item block",
				err: error
			});
		});
};

// Middleware passed to make sure that required contents of see request is present
const checkSeeBody = (req, res, next) => {
	// check if required fields for deleting itemblock are present
	if (!req.body.item_id) {
		return res.status(401).json({
			status: "Missing item id"
		});
	}

	next();
};

// function for searching up a particular item
const seeItem = (req, res, next) => {
	const itemid = req.body.item_id;
	const query = { _id: itemid };

	ItemBlock
		.findOne(query)
		.then(item => {
			res.status(200).json({
				status: "Item block has been successfully found",
				itemblock: item
			});
		})
		.catch(error => {
			res.status(500).json({
				status: "An error has occurred trying to search for an item block",
				err: error
			});
		})
};

// Middleware passed to make sure that required contents of see all request is present
const checkSeeAllBody = (req, res, next) => {
	// check if required fields for deleting itemblock are present
	if (!req.body.user_id) {
		return res.status(401).json({
			status: "Missing user id"
		});
	}

	next();
};

// function for searching all item blocks produced by a single user
const seeAllItems = (req, res, next) => {
	const userid = req.body.user_id;
	const query = { user_id: userid };

	ItemBlock
		.find(query)
		.then(items => {
			res.status(200).json({
				status: "Item blocks has been successfully found",
				itemblocks: items
			});
		})
		.catch(error => {
			res.status(500).json({
				status: "An error has occurred trying to search for item blocks",
				err: error
			});
		})
};

module.exports.checkCreateBody = checkCreateBody;
module.exports.createItem = createItem;
module.exports.checkUpdateBody = checkUpdateBody;
module.exports.updateItem = updateItem;
module.exports.checkDeleteBody = checkDeleteBody;
module.exports.deleteItem = deleteItem;
module.exports.checkSeeBody = checkSeeBody;
module.exports.seeItem = seeItem;
module.exports.checkSeeAllBody = checkSeeAllBody;
module.exports.seeAllItems = seeAllItems;