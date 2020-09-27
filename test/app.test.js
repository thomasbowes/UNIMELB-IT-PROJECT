const expect = require('chai').expect;

// to test our endpoints
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

// Retrieving URI for test mongodb server
const db = require('../config/keys').testMongoURI;

// connecting to mock database...
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});

const User = require('../models/Users');
const testInput = require('./testInput');

// testing our whole application 
describe('App test', () => {
	let server;

	// setting things up before testing (inputting test examples)
	before(function () {

		// starting local server
		server = app.listen(5001);

		// inserting all tests into mock database
		return User.insertMany(testInput.tests);
	});

	// after finishing tests, delete all records in mock db and closing server
	
	after(async function() {
		await User.deleteMany({});
		await mongoose.connection.close();
		await server.close();
	});

	describe("Authenticating user via facebook auth", () => {
		// TEST UNSTABLE, NOT SURE IF FB TOKEN CAN EXPIRE
		it("Correct access token supplied", function(done) {
			request(app)
				.post('/api/users/oauth/facebook')
				.send(testInput.correctFbCreds)
				.expect('Content-Type', /json/)
				.expect(200, done);
		});

		it("Incorrect access token supplied", function(done) {
			request(app)
				.post('/api/users/oauth/facebook')
				.send(testInput.incorrectFbCreds)
				.expect('Content-Type', /json/)
				.expect(401, done);
		});
	});

	// tests whether server returns all users in database
	// P.S this function isn't done yet, needs more tests 
	describe("Getting all users from database", () => {
		it("Getting all existing users", function(done) {
			request(app)
				.get('/api/users/alluser')
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