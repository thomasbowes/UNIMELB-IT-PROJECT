const chai = require('chai');
const expect = chai.expect;

// to test our endpoints
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

// Retrieving URI for test mongodb server
const db = require('../config/keys').testMongoURI;

// connecting to mock database...
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model('User');
const testInput = require('./testInput');

// testing our whole application 
describe('App test', () => {
	let server;

	// setting things up before testing (inputting test examples)
	before(async function () {
		this.timeout(15000);
		// starting local server
		server = app.listen(5001);

		// inserting all tests into mock database
		await User.insertMany(testInput.tests);
	});

	// after finishing tests, delete all records in mock db and closing server
	
	after(async function() {
		this.timeout(15000);
		await User.deleteMany({});
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

	describe("Authenticate JWT", function() {
		it("Incorrect JWT provided", function(done) {
			request(app)
				.get('/api/users/authenticate')
				.set("Authorization", testInput.authInvalidToken)
				.expect({
					message: "Authentication unsuccessful"
				})
				.expect(401, done);
		});

		it("Bearer header not provided", function(done) {
			request(app)
				.get('/api/users/authenticate')
				.set("Authorization", testInput.authBearerNotProvided)
				.expect('Content-Type', /json/)
				.expect({
					message: "Authentication unsuccessful"
				})
				.expect(401, done);
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
				.expect(200, done);
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

		it("Register new user without username", function(done) {
			request(app)
				.post('/api/users/register')
				.send(testInput.newUserNoName)
				.expect('Content-Type', /json/)
				.expect({
					status: "Missing username, email, or password"
				})
				.expect(400, done)
		});

		it("Register new user without email", function(done) {
			request(app)
				.post('/api/users/register')
				.send(testInput.newUserNoEmail)
				.expect('Content-Type', /json/)
				.expect({
					status: "Missing username, email, or password"
				})
				.expect(400, done)
		});

		it("Register new user without password", function(done) {
			request(app)
				.post('/api/users/register')
				.send(testInput.newUserNoPassword)
				.expect('Content-Type', /json/)
				.expect({
					status: "Missing username, email, or password"
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
	});
});