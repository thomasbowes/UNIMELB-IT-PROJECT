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

module.exports = { authenticateJWT };