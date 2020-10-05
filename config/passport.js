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
	// optimised code, don't need to search database EVERYTIME

	const user = {
		_id: payload.userId,
		firstname: payload.firstname,
		lastname: payload.lastname,
		email: payload.email,
		isAdmin: payload.isAdmin
	};

	return done(null, user);

	// User.findOne({ _id: payload.userId })
	// 	.then((user) => {
	// 		// if user exists in db
	// 		if (user) {
	// 			// refers to success method, will go through other middleware
	// 			return done(null, user);
	// 		} else {
	// 		// if user doesn't exist
	// 			return done(null, false);
	// 		}
	// 	})
	// 	.catch((err) => done(err, null));
});

passport.use(strategy);

let fbCallbackURL;

if(process.env.NODE_ENV === 'development'){
	fbCallbackURL = "http://localhost:5000/api/users/oauth/facebook/callback";
}
else if (process.env.NODE_ENV === 'production') {
	fbCallbackURL = "https://folio-exchange.herokuapp.com/api/users/oauth/facebook/callback";
}

const fbOptions = {
	clientID: process.env.FACEBOOK_ID,
	clientSecret: process.env.FACEBOOK_SECRET,
	//callbackURL: "http://localhost:5000/api/users/oauth/facebook/callback",
	callbackURL: fbCallbackURL,
	profileFields: ['id', 'displayName', 'name', 'email']
};

// how the passport middleware is going to authorize a request with facebook credentials	
const facebookStrategy = new FacebookTokenStrategy(fbOptions, 
	(accessToken, refreshToken, profile, done) => {
		// attempting to find if email exists in database
		User.findOne({ email: profile.emails[0].value })
			.then((user) => {
				if (user) {
					// if facebook user exists, return back user details
					if (user.facebookID) {
						return done(null, user);	
					// else, append facebook ID to already existing user details
					} else {
						user.facebookID = profile.id;

						user.save()
							.then(() => {
								return done(null, user);
							})
							.catch(err => {
								return done(err, false);
							});
					}
				// if facebook user doesn't exist, create in db and return user details
				} else {
					const newUser = new User({
						firstname: profile.name.givenName,
						lastname: profile.name.familyName,
						email: profile.emails[0].value,
						facebookID: profile.id,
						confirm: true
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

let googleCallbackURL;

if(process.env.NODE_ENV === 'development'){
	googleCallbackURL = "http://localhost:5000/api/users/oauth/google/callback";
}
else if (process.env.NODE_ENV === 'production') {
	googleCallbackURL = "https://folio-exchange.herokuapp.com/api/users/oauth/google/callback";
}

const googleOptions = {
	clientID: process.env.GOOGLE_ID,
	clientSecret: process.env.GOOGLE_SECRET,
	//callbackURL: "http://localhost:5000/api/users/oauth/google/callback"
	callbackURL: googleCallbackURL
}

const googleStrategy = new GoogleTokenStrategy(googleOptions, 
	(accessToken, refreshToken, profile, done) => {
		console.log(profile);
		// attempting to find email in database
		User.findOne({ email: profile.emails[0].value })	
			.then((user) => {
				if (user) {
					// if google ID is already present in user details, return user details back
					if (user.googleID) {
						return done(null, user);	
					// else, append google ID into existing user details
					} else {
						user.googleID = profile.id;

						user.save()
							.then(() => {
								return done(null, user);
							})
							.catch(err => {
								return done(err, false);
							});
					}
				// if google user doesn't exist, create in db and return user details
				} else {
					const newUser = new User({
						firstname: profile.name.givenName,
						lastname: profile.name.familyName,
						email: profile.emails[0].value,
						googleID: profile.id,
						confirm: true
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