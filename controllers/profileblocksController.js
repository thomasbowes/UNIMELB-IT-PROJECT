const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Point to the file storing environment variables, in order to use them in the nodejs app
dotenv.config({ path: './.env' });

const ProfileBlock = require('mongoose').model('ProfileBlock');

// Middleware passed to make sure that required contents of create request is present
const checkCreateBody = (req, res, next) => {
	// check if required fields for creating profileblock are present
	if (!req.body.user_id) {
		return res.status(401).json({
			status: "Missing user id"
		});
	}

	next();
};

// Middleware passed to make sure that required contents are passed in update request
const checkUpdateBody = (req, res, next) => {
	// check if required fields for updating profileblock are present
	if (!req.body.user_id || !req.body.profile_id || !req.body.contents) {
		return res.status(401).json({
			status: "Missing user id, profile id or profile attributes that needs to be changed"
		});
	}

	next();
};

// Middleware passed to make sure that required contents are passed in delete request
const checkDeleteBody = (req, res, next) => {
	// check if required fields for creating profileblock are present
	if (!req.body.user_id || !req.body.profile_id) {
		return res.status(401).json({
			status: "Missing user id or profile id"
		});
	}

	next();
};

// Middleware passed to make sure that required contents are passed in see request
const checkSeeBody = (req, res, next) => {
	if (!req.body.user_id) {
		return res.status(401).json({
			status: "Missing user id"
		});
	}

	next();
};

// function used to create profile for user
const createProfile = (req, res, next) => {
	// if no attributes were passed except user id
	if (!req.body.contents) {
		req.body.contents = {};
	}

	// add user id attribute to content object (intention is to separate user id from contents
	// initally; this for the sole purpose for my auth middleware to work (if further explanation
	// is needed, contact me))
	req.body.contents.user_id = req.body.user_id;

	// attributes of new profile object must be stored in "req.body.contents" in order to
	// save this new profile block in the database
	const newProfile = new ProfileBlock(req.body.contents);

	newProfile
		.save()
		.then(() => {
			res.status(201).json({
				status: "Profile block has been successfully created",
				profile: newProfile
			});
		})
		.catch(error => {
			res.status(500).json({
				status: "An error has occurred trying to create an profile block",
				err: error
			});
		});
};

// function for updating a profile
const updateProfile = (req, res, next) => {
	const profileid = req.body.profile_id;
	// query represents which value we're using to search the database
	const query = { _id: profileid };

	ProfileBlock
		// req.body.contents is an object that contains the fields we want to change in a profile block
		.findOneAndUpdate(query, req.body.contents, {upsert: true})
		.then(results => {
			// check if block is present in database 
			if (!results) {
				res.status(200).json({
					status: "Profile block has been successfully updated"
				});
			} else {
				res.status(200).json({
					status: "Profile block does not exist in our database"
				});
			}
		})
		.catch(error => {
			res.status(500).json({
				status: "An error has occurred trying to update an profile block",
				err: error
			});
		});
};

// function from deleting a profile block from a user
const deleteProfile = (req, res, next) => {
	const profileid = req.body.profile_id;
	const query = { _id: profileid };

	ProfileBlock
		.deleteOne(query)
		.then(result => {
			// if database actually deleted any profiles
			if (result.deletedCount == 0) {
				res.status(200).json({
					status: "Profile block does not exist in our database"
				});
			} else {
				res.status(200).json({
					status: "Profile block has been successfully deleted"
				});
			}
		})
		.catch(error => {
			res.status(500).json({
				status: "An error has occurred trying to delete an profile block",
				err: error
			});
		}); 
};

// function for finding a profile from a user
const seeProfile = (req, res, next) => {
	const userid = req.body.user_id;
	const query = { user_id: userid };

	ProfileBlock
		.findOne(query)
		.then(item => {
			if (!item) {
				res.status(200).json({
					status: "Profile does not exist in our database"
				});
			} else {
				res.status(200).json({
					status: "Profile block has been successfully found",
					profile: item
				});
			}
		})
		.catch(error => {
			res.status(500).json({
				status: "An error has occurred trying to search for a profile block",
				err: error
			});
		})
};

module.exports.checkCreateBody = checkCreateBody;
module.exports.checkUpdateBody = checkUpdateBody;
module.exports.checkDeleteBody = checkDeleteBody;
module.exports.checkSeeBody = checkSeeBody;
module.exports.createProfile = createProfile;
module.exports.updateProfile = updateProfile;
module.exports.deleteProfile = deleteProfile;
module.exports.seeProfile = seeProfile;