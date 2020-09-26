const User = require('mongoose').model('User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookTokenStrategy = require('passport-facebook-token');

require('dotenv').config();

const options = {
	// where to extract the jSON web token from (in this case,
	// from Authorization header with Bearer string attached to token)
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	// signing key 
	secretOrKey: process.env.JWT_KEY,
	algorithms: ['HS256']
};

// how the passport middleware is going to authorize a given request
const strategy = new JwtStrategy(options, (payload, done) => {
	User.findOne({ _id: payload.userId })
		.then((user) => {
			// if user exists in db
			if (user) {
				// refers to success method, will go through other middleware
				return done(null, user);
			} else {
			// if user doesn't exist
				return done(null, false);
			}
		})
		.catch((err) => done(err, null));
});

const fbOptions = {
	clientID: process.env.FACEBOOK_ID,
	clientSecret: process.env.FACEBOOK_SECRET
};

// how the passport middleware is going to authorize a request with facebook credentials	
const facebookStrategy = new FacebookTokenStrategy(fbOptions, 
	(accessToken, refreshToken, profile, done) => {});

// which function the passport will provide when invoked
module.exports = (passport) => {
	passport.use(strategy);
}

