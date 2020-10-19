const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Point to the file storing environment variables, in order to use them in the nodejs app
dotenv.config({ path: './.env' });

const ProfileBlock = mongoose.model('ProfileBlock');

// Middleware passed to make sure that required contents are passed in update request
const checkUpdateBody = (req, res, next) => {
	// check if required fields for updating profileblock are present
	if (!req.body.profile_id || !req.body.contents) {
		return res.status(401).json({
			status: "Missing profile id or profile attributes that needs to be changed"
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
					status: "Profile block does not exist in our database"
				});
			} else {
				res.status(200).json({
					status: "Profile block has been successfully updated"
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

// function for finding a profile from a user
const seeProfile = (req, res, next) => {
	const userid = req.body.user_id;
	const query = { user_id: userid };

	ProfileBlock
		.findOne(query)
		.then(item => {
			if (!item) {
				res.status(200).json({
					status: "Profile does not exist in our database",
					profile: {}
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

module.exports.checkUpdateBody = checkUpdateBody;
module.exports.checkSeeBody = checkSeeBody;
module.exports.updateProfile = updateProfile;
module.exports.seeProfile = seeProfile;