const express = require('express');
const passport = require('passport');

const mongoose = require('mongoose');
const ProfileBlock = mongoose.model('ProfileBlock');
const ItemBlock = mongoose.model('ItemBlock');

// a shorthand middleware used to authenticate a given JWT
const authenticateJWT = (req, res, next) => {
	// custom callback - needed to send error in JSON format
	passport.authenticate('jwt', (err, user, info) => {	
		// if some error has been encountered while verifying JWT	
		if (err) {
			return res.status(401).json({
				message: "Authentication unsuccessful",
				status: false,
				error: err
			});
		}

		// if JWT isn't valid, return back error
		if (!user) {
			return res.status(401).json({
				message: "Token provided is invalid",
				status: false
			});
		}

		// needed in order to turn session off (if not inserted, session is established)
		req.logIn(user, { session: false }, next);
	}) (req, res, next);
};

// a middleware to check if current user is allowed to post/edit/delete a portfolio
const authenticateUser = async (req, res, next) => {
	// extract current user id from decoded JWT
	const currUser = req.user._id;
	// user id of post checked via database call
	let userOfPost;

	// trying to find type of request and extracting query info from request
	if (req.body.item_id) {
		userOfPost = await ItemBlock.findOne({ _id: req.body.item_id }, 'user_id');

		if (!userOfPost) {
			userOfPost = null;
		}
	} else if (req.body.profile_id) {
		userOfPost = await ProfileBlock.findOne({ _id: req.body.profile_id }, 'user_id');

		if (!userOfPost) {
			userOfPost = null;
		}
	} else {
		userOfPost = null;
	}

	// if no object was found in the database, otherwise try to extract user id
	if (!userOfPost) {
		return res.status(401).json({
			message: "No such id exists in the database"
		});
	} else {
		userOfPost = userOfPost.user_id;
	}

	// if user is permitted to commit to a particular action
	if (currUser == userOfPost) {
		next();
	} else {
		return res.status(401).json({
			message: "Request is invalid for current user"
		});
	}
};

// a middleware to check if current user is either an admin or permitted user
const authAdminUser = (req, res, next) => {
	if (req.user.isAdmin) {
		next();
	}

	authenticateUser(req, res, next);
};

module.exports = { authenticateJWT, authenticateUser, authAdminUser };