const User = require('mongoose').model('User');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookTokenStrategy = require('passport-facebook');
const GoogleTokenStrategy = require('passport-google-oauth20');

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

passport.use(strategy);

const fbOptions = {
	clientID: process.env.FACEBOOK_ID,
	clientSecret: process.env.FACEBOOK_SECRET,
	callbackURL: "http://localhost:5000/api/users/oauth/facebook/callback"
};

// how the passport middleware is going to authorize a request with facebook credentials	
const facebookStrategy = new FacebookTokenStrategy(fbOptions, 
	(accessToken, refreshToken, profile, done) => {
		User.findOne({ facebookID: profile.id })
			.then((user) => {
				// if facebook user exists in db, return back user details
				if (user) {
					return done(null, user);

				// if facebook user doesn't exist, create in db and return user details
				} else {
					const newUser = new User({
						username: profile.displayName,
						email: profile.emails[0].value,
						facebookID: profile.id
					});

					newUser.save()
						.then(() => {
							return done(null, newUser);
						})
						.catch((err) => {
							return done(err, false);
						});
				}
			})
			.catch((err) => {
				done(err, false);
			});
});

passport.use('facebook', facebookStrategy);

const googleOptions = {
	clientID: process.env.GOOGLE_ID,
	clientSecret: process.env.GOOGLE_SECRET,
	callbackURL: "http://localhost:5000/api/users/oauth/google/callback"
}

const googleStrategy = new GoogleTokenStrategy(googleOptions, 
	(accessToken, refreshToken, profile, done) => {
		User.findOne({ googleID: profile.id })	
			.then((user) => {
				// if google user exists in db, return back user details
				if (user) {
					return done(null, user);

				// if google user doesn't exist, create in db and return user details
				} else {
					const newUser = new User({
						username: profile.displayName,
						email: profile.emails[0].value,
						googleID: profile.id
					});

					newUser.save()
						.then(() => {
							return done(null, newUser);
						})
						.catch((err) => {
							return done(err, false);
						});
				}
			})
			.catch((err) => {
				done(err, false);
			});
});

passport.use('google', googleStrategy);