const chai = require('chai');
const expect = chai.expect;

// to test our endpoints
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

// Retrieving URI for test mongodb server
const db = require('../config/keys').testMongoURI;

// connecting to mock database...
mongoose.set('useFindAndModify', false);
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model('User');
const ItemBlock = mongoose.model('ItemBlock');
const ProfileBlock = mongoose.model('ProfileBlock');
const testInput = require('./testInput');

// testing our whole application 
describe('App test', () => {
	let server;
	let access_token;
	let refresh_token;
	let user_id;
	let item_id;
	let profile_id = '1021b706175df1546e3acb10';

	// setting things up before testing (inputting test examples)
	before(async function () {
		this.timeout(15000);
		// starting local server
		server = app.listen(5001);

		// inserting all tests into mock database
		await User.insertMany(testInput.userTests);
		await ItemBlock.insertMany(testInput.itemTests);
		await ProfileBlock.insertMany(testInput.profileTests);
	});

	// after finishing tests, delete all records in mock db and closing server
	
	after(async function() {
		this.timeout(15000);
		await User.deleteMany({});
		await ItemBlock.deleteMany({});
		await ProfileBlock.deleteMany({});
		await mongoose.connection.close();
		await server.close();
	});

	// tests whether server returns all users in database
	// P.S this function isn't done yet, needs more tests 
	describe("Getting all users from database", () => {
		it("Getting all existing users", function(done) {
			this.timeout(15000);
			request(app)
				.get('/api/users/alluser')
				.expect('Content-Type', /json/)
				.expect(200, done);
		});
	});

	describe("Login a user into our website", function() {
		it("User logins in with incorrect email", function(done) {
			request(app)
				.post('/api/users/login')
				.send(testInput.loginInvalidEmail)
				.expect('Content-Type', /json/)
				.expect({
					message: 'Email or Password is incorrect'
				})
				.expect(401, done);
		});

		it("User logins in with incorrect password", function(done) {
			request(app)
				.post('/api/users/login')
				.send(testInput.loginInvalidPassword)
				.expect('Content-Type', /json/)
				.expect({
					message: 'Email or Password is incorrect'
				})
				.expect(401, done);
		});

		it("User puts correct credentials but did not confirm email", function(done) {
			request(app)
				.post('/api/users/login')
				.send(testInput.loginEmailNotConfirm)
				.expect('Content-Type', /json/)
				.expect({
					message: 'Confirm your email'
				})
				.expect(401, done);
		});

		it("User logs in successfully", function(done) {
			request(app)
				.post('/api/users/login')
				.send(testInput.loginOkay)
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					user_id = res.body.userAuthToken._id;
					access_token = res.body.userAuthToken.token;
					refresh_token = res.body.userAuthToken.refresh_token;
					done();
				});	
		});
	});

	describe("Authenticate JWT", function() {
		it("Incorrect JWT provided", function(done) {
			request(app)
				.get('/api/users/authenticate')
				.set("Authorization", testInput.authInvalidToken)
				.expect({
					message: "Token provided is invalid",
					status: false
				})
				.expect(401, done);
		});

		it("Bearer header not provided", function(done) {
			request(app)
				.get('/api/users/authenticate')
				.set("Authorization", testInput.authBearerNotProvided)
				.expect('Content-Type', /json/)
				.expect({
					message: "Token provided is invalid",
					status: false
				})
				.expect(401, done);
		});

		it("Valid access token provided", function(done) {
			request(app)
				.get('/api/users/authenticate')
				.set("Authorization", "Bearer " + access_token)
				.expect('Content-Type', /json/)
				.expect(200, done);
		});
	});

	describe("Testing /api/itemblocks/create route", () => {
		it("Create item block with correct details", function(done) {
			const correctItemDetails = testInput.correctItemDetails;

			request(app)
				.post('/api/itemblocks/create')
				.set("Authorization", "Bearer " + access_token)
				.send(correctItemDetails)
				.expect('Content-Type', /json/)
				.expect(201)
				.end((err, res) => {
					item_id = res.body.item._id;
					done();
				});	
		});

		it("Create item block with incorrect details", function(done) {
			const incorrectItemDetails = testInput.incorrectItemDetails;

			request(app)
				.post('/api/itemblocks/create')
				.set("Authorization", "Bearer " + access_token)
				.send(incorrectItemDetails)
				.expect('Content-Type', /json/)
				.expect(500, done);
		});

		it("Create item block with missing details", function(done) {
			const missingItemDetails = testInput.missingItemDetails;

			request(app)
				.post('/api/itemblocks/create')
				.set("Authorization", "Bearer " + access_token)
				.send(missingItemDetails)
				.expect('Content-Type', /json/)
				.expect({
					status: "Missing either type of item block, its title or the contents body"
				})
				.expect(401, done);
		});
	});

	describe("Testing /api/itemblocks/update route", () => {
		it("Update item block with correct details", function(done) {
			const rightUpdItemDetails = testInput.rightUpdItemDetails;
			rightUpdItemDetails.item_id = item_id;

			request(app)
				.post('/api/itemblocks/update')
				.set("Authorization", "Bearer " + access_token)
				.send(rightUpdItemDetails)
				.expect('Content-Type', /json/)
				.expect(200, done);
		});

		it("Update item block with incorrect details", function(done) {
			const wrongUpdItemDetails = testInput.wrongUpdItemDetails;
			wrongUpdItemDetails.item_id = item_id;

			request(app)
				.post('/api/itemblocks/update')
				.set("Authorization", "Bearer " + access_token)
				.send(wrongUpdItemDetails)
				.expect('Content-Type', /json/)
				// incorrect details are ignored when updating item blocks
				.expect(200, done);
		});

		it("Update item block with missing details", function(done) {
			// contents body is missing from below object
			const missUpdItemDetails = {};

			request(app)
				.post('/api/itemblocks/update')
				.set("Authorization", "Bearer " + access_token)
				.send(missUpdItemDetails)
				.expect('Content-Type', /json/)
				.expect({
					status: "Missing either item id or the body of change"
				})
				.expect(401, done);
		});		
	});

	describe("Testing /api/itemblocks/delete route", () => {
		it("Delete item block with missing details", function(done) {
			// forgot item_id
			const missingDeleteItemDetails = {};

			request(app)
				.post('/api/itemblocks/delete')
				.set("Authorization", "Bearer " + access_token)
				.send(missingDeleteItemDetails)
				.expect('Content-Type', /json/)
				.expect({
					status: "Missing item id"
				})
				.expect(401, done);
		});

		it("Delete item block with incorrect details", function(done) {
			const incorrectDeleteItemDetails = {};
			incorrectDeleteItemDetails.item_id = mongoose.Types.ObjectId('1121b706175df1546e3acb09');

			request(app)
				.post('/api/itemblocks/delete')
				.set("Authorization", "Bearer " + access_token)
				.send(incorrectDeleteItemDetails)
				.expect('Content-Type', /json/)
				.expect({
					message: "No such id exists in the database"
				})
				// even though item block doesn't exist, database operation still returns something
				.expect(401, done);
		});

		it("Delete item block with correct details", function(done) {
			const correctDeleteItemDetails = {};
			correctDeleteItemDetails.item_id = item_id;

			request(app)
				.post('/api/itemblocks/delete')
				.set("Authorization", "Bearer " + access_token)
				.send(correctDeleteItemDetails)
				.expect('Content-Type', /json/)
				.expect({
					status: "Item block has been successfully deleted"
				})
				.expect(200, done);
		});
	});

	describe("Testing /api/profileblocks/update route", () => {
		it("Update profile block with correct details", function(done) {
			const rightUpdProfileDetails = testInput.rightUpdProfileDetails;
			rightUpdProfileDetails.profile_id = profile_id;

			request(app)
				.post('/api/profileblocks/update')
				.set("Authorization", "Bearer " + access_token)
				.send(rightUpdProfileDetails)
				.expect('Content-Type', /json/)
				.expect(200, done);
		});

		it("Update profile block with incorrect details", function(done) {
			const wrongUpdProfileDetails = testInput.wrongUpdProfileDetails;
			// profile block doesn't exist in test database
			wrongUpdProfileDetails.profile_id = mongoose.Types.ObjectId('f3d6c9d62d60d057f0644009');

			request(app)
				.post('/api/profileblocks/update')
				.set("Authorization", "Bearer " + access_token)
				.send(wrongUpdProfileDetails)
				.expect('Content-Type', /json/)
				.expect({
					message: "No such id exists in the database"
				})
				.expect(401, done);
		});

		it("Update profile block with missing details", function(done) {
			const missUpdProfileDetails = {};
			// forgot contents body 

			request(app)
				.post('/api/profileblocks/update')
				.set("Authorization", "Bearer " + access_token)
				.send(missUpdProfileDetails)
				.expect('Content-Type', /json/)
				.expect({
					status: "Missing profile id or profile attributes that needs to be changed"
				})
				.expect(401, done);
		});	
	});

	describe("Testing /api/users/update endpoint", function() {
		it("Correct details provided", function(done) {
			const correctUserDetails = testInput.rightUpdateUserDetails;

			request(app)
				.post('/api/users/update')
				.set("Authorization", "Bearer " + access_token)
				.send(correctUserDetails)
				.expect('Content-Type', /json/)
				.expect(200, done);
		});

		it("Missing body provided", function(done) {
			const missingUserDetails = {};

			request(app)
				.post('/api/users/update')
				.set("Authorization", "Bearer " + access_token)
				.send(missingUserDetails)
				.expect('Content-Type', /json/)
				.expect({
					status: "Include body of change"
				})
				.expect(401, done);
		});
	});

	describe("Retrieve new access token", function() {
		it("Invalid refresh token is provided", function(done) {
			request(app)
				.post('/api/users/refresh')
				.send(testInput.invalidRefreshToken)
				.expect('Content-Type', /json/)
				.expect({
					message: "Token is invalid",
					status: false
				})
				.expect(401, done);
		});

		it("Valid refresh token is provided", function(done) {
			const postBody = {
				refresh_token: refresh_token
			};

			request(app)
				.post('/api/users/refresh')
				.send(postBody)
				.expect('Content-Type', /json/)
				.expect(201, done);
		});
	});
	
	// Tests if a POST request (i.e. register) will be made successfully
	describe("Register a new user in the database", function () {

		it("Register new user with unique email", function(done) {
			request(app)
				.post('/api/users/register')
				.send(testInput.newUser)
				.expect('Content-Type', /json/)
				.expect(201, done);
		});

		it("Register new user with duplicated email", function(done) {
			request(app)
				.post('/api/users/register')
				.send(testInput.newUserDupEmail)
				.expect('Content-Type', /json/)
				.expect({
					status: "Email is already registered"
				})
				.expect(200, done);
		});

		it("Register new user without lastname and firstname", function(done) {
			request(app)
				.post('/api/users/register')
				.send(testInput.newUserNoFullName)
				.expect('Content-Type', /json/)
				.expect({
					status: "Missing firstname, lastname, email, or password"
				})
				.expect(400, done)
		});

		it("Register new user without firstname", function(done) {
			request(app)
				.post('/api/users/register')
				.send(testInput.newUserNoFirstname)
				.expect('Content-Type', /json/)
				.expect({
					status: "Missing firstname, lastname, email, or password"
				})
				.expect(400, done)
		});

		it("Register new user without lastname", function(done) {
			request(app)
				.post('/api/users/register')
				.send(testInput.newUserNoLastname)
				.expect('Content-Type', /json/)
				.expect({
					status: "Missing firstname, lastname, email, or password"
				})
				.expect(400, done)
		});


		it("Register new user without email", function(done) {
			request(app)
				.post('/api/users/register')
				.send(testInput.newUserNoEmail)
				.expect('Content-Type', /json/)
				.expect({
					status: "Missing firstname, lastname, email, or password"
				})
				.expect(400, done)
		});

		it("Register new user without password", function(done) {
			request(app)
				.post('/api/users/register')
				.send(testInput.newUserNoPassword)
				.expect('Content-Type', /json/)
				.expect({
					status: "Missing firstname, lastname, email, or password"
				})
				.expect(400, done)
		});
		
		it("Register new user with invalid email", function(done) {
			request(app)
				.post('/api/users/register')
				.send(testInput.newUserInvalidEmail)
				.expect('Content-Type', /json/)
				.expect({
					status: "Invalid Email"
				})
				.expect(400, done)
		});

		it("Link local user details with facebook details", function(done) {
			request(app)
				.post('/api/users/register')
				.send(testInput.localUserRegister)
				.expect('Content-Type', /json/)
				.expect({
					status: "Thank you for registering - Please log in"
				})
				.expect(200, done)
		});

		it("Register new user with already existing email and google log in", function(done) {
			request(app)
				.post('/api/users/register')
				.send(testInput.localInvalidUserRegister)
				.expect('Content-Type', /json/)
				.expect({
					status: "Email is already registered"
				})
				.expect(200, done)
		});
	});

	// Search for users in database
	describe("Search users in database", function() {
		
		it("Search an existing user by firstname with exact spelling", function(done) {
			request(app)
				.get('/api/users/search?key=TinTin')
				.expect('Content-Type', /json/)
				.expect( function(res) {
					if (res.body.data.length !== 1){
						throw new Error("Not finding the correct number of matches");
					}
				})
				.expect(200, done);
		});

		it("Search an existing user by firstname case-sensitively", function(done) {
			request(app)
				.get('/api/users/search?key=tintin')
				.expect('Content-Type', /json/)
				.expect( function(res) {
					if (res.body.data.length !== 1){
						throw new Error("Not finding the correct number of matches");
					}
				})
				.expect(200, done);
		});

		it("Search multiple existing users by lastname", function(done) {
			request(app)
				.get('/api/users/search?key=random')
				.expect('Content-Type', /json/)
				.expect( function(res) {
					if (res.body.data.length !== 2){
						throw new Error("Not finding the correct number of matches");
					}
				})
				.expect(200, done);
		});

		it("Search existing users by fullname with space in the middle", function(done) {
			request(app)
				.get('/api/users/search?key=tintin random')
				.expect('Content-Type', /json/)
				.expect( function(res) {
					if (res.body.data.length !== 1){
						throw new Error("Not finding the correct number of matches");
					}
				})
				.expect(200, done);
		});

		it("Search existing users by fullname without space in the middle", function(done) {
			request(app)
				.get('/api/users/search?key=tintinrandom')
				.expect('Content-Type', /json/)
				.expect( {
					message: 'No matching result'
				})
				.expect(200, done);
		});

		it("Search existing users with space at the two ends", function(done) {
			request(app)
				.get('/api/users/search?key=     tintin random    ')
				.expect('Content-Type', /json/)
				.expect( function(res) {
					if (res.body.data.length !== 1){
						throw new Error("Not finding the correct number of matches");
					}
				})
				.expect(200, done);
		});

		it("Search only spaces", function(done) {
			request(app)
				.get('/api/users/search?key=        ')
				.expect('Content-Type', /json/)
				.expect( {
					message: "Please input something to search for"
				})
				.expect(400, done);
		});

		it("Search non-existing users", function(done) {
			request(app)
				.get('/api/users/search?key=Laker Champ')
				.expect('Content-Type', /json/)
				.expect( {
					message: 'No matching result'
				})
				.expect(200, done);
		});

		it("Search nothing", function(done) {
			request(app)
				.get('/api/users/search?key=')
				.expect('Content-Type', /json/)
				.expect( {
					message: "Please input something to search for"
				})
				.expect(400, done);
		});

	});


	// The result of search users need to include urlProfile
	describe("Include urlProfile in the search user result", function() {

		it("If the ProfileBlock doesn't exist: title, aboutMe and urlProfile set to empty string", function(done) {
			request(app)
			.get('/api/users/search?key=tester')
			.expect('Content-Type', /json/)
			.expect( function(res) {
				
				if (res.body.data.length === 0){
					throw new Error("Not the expected response. There should be matches.");
				}

				if (res.body.data[0].urlProfile || res.body.data[1].urlProfile){
					throw new Error("Not the expected response. urlProfile should be empty string. ");
				}
				if (res.body.data[0].title || res.body.data[1].title){
					throw new Error("Not the expected response. title should be empty string. ");
				}
				if (res.body.data[0].aboutMe || res.body.data[1].aboutMe){
					throw new Error("Not the expected response. aboutMe should be empty string. ");
				}
			})
			.expect(200, done);
		});

		
		it("For all users, if ProfileBlock exists: title, aboutMe, urlProfile will be sent back (if exist).", function(done){
			request(app)
			.get('/api/users/search?key=t')
			.expect('Content-Type', /json/)
			.expect( function(res) {
				
				if (res.body.data.length === 0){
					throw new Error("Not the expected response. There should be matches.");
				}

				if(!res.body.data[0].urlProfile || !res.body.data[3].urlProfile){
					throw new Error("Not the expected response. urlProfile should not be empty");
				}

				if(!res.body.data[0].title || !res.body.data[0].aboutMe){
					throw new Error("Not the expected response. title and aboutMe for this user should not be empty");
				}

				if(res.body.data[3].title || res.body.data[3].aboutMe){
					throw new Error("Not the expected response. aboutMe for these users should be empty string");
				}
			
				if(res.body.data[1].urlProfile || res.body.data[2].urlProfile){
					throw new Error("Not the expected response. urlProfile should be empty string.");
				}
			})
			.expect(200, done);
		});
	});

});