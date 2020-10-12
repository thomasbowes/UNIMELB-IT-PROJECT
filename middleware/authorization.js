const express = require('express');
const passport = require('passport');

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
const authenticateUser = (req, res, next) => {
	// extract current user id from decoded JWT
	const currUser = req.user._id;
	// user id of post that needs to be changed (must be provided by frontend)
	const userOfPost = req.body.user_id; 

	// if user is either same user or if user is admin
	if (currUser === userOfPost || req.user.isAdmin) {
		next();
	} else {
		return res.status(401).json({
			message: "Request is invalid for current user"
		});
	}
};

module.exports = { authenticateJWT, authenticateUser };