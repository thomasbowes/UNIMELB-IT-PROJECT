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

// testing our whole application 
describe('App test', () => {
	let server;

	// setting things up before testing (inputting test examples)
	before(function () {
		const tests = [
			{
				username: 'tester1',
				password: 'lkjfklajfa98awjfk',
				email: 'tester1@mail.com',
				confirm: true,
				isAdmin: false
			},
			{
				username: 'tester2',
				password: 'laksdfjklhhwhfuwhfhwuifh',
				email: 'tester2@mail.com',
				confirm: false,
				isAdmin: false
			}
		]

		// starting local server
		server = app.listen(5001);

		// inserting all tests into mock database
		return User.insertMany(tests);
	});

	// after finishing tests, delete all records in mock db and closing server
	/*
	after(async function() {
		await User.deleteMany({});
		await mongoose.connection.close();
		await server.close();
	});
	*/

	// tests whether server returns all users in database
	// P.S this function isn't done yet, needs more tests 
	describe("Getting all users from database", () => {
		it("getting all users", function(done) {
			request(app)
				.get('/api/users/alluser')
				.expect('Content-Type', /json/)
				.expect(200, done);
		});
	});
	
	// Tests if a POST request (i.e. register) will be made successfully
	describe("Register a new user in the database", function () {
		
		const newUser = {
			username: 'TinTin',
			email: 'haoxinli89@gmail.com',
			password: 'tesing123',
			confirm: false,
			isAdmin: false
		};

		const newUserDupEmail = {
			username: 'Captain',
			email: 'haoxinli89@gmail.com',
			password: 1234,
			confirm: false,
			isAdmin: false
		}

		const newUserNoName = {
			email: 'haoxinl1@student.unimelb.edu.au',
			password: 1234
		}
		
		// Question: check that a confirmation email address has been sent?
		it("Register a new user with unique email", function(done) {
			request(app)
				.post('/api/users/register')
				.send(newUser)
				.expect('Content-Type', /json/)
				.expect(201, done);
		});

		it("Register new user with duplicated email", function(done) {
			request(app)
				.post('/api/users/register')
				.send(newUserDupEmail)
				.expect('Content-Type', /json/)
				.expect({
					status: "Email is already registered"
				})
				.expect(200, done);
		});

		it("Register new user without username", function(done) {
			request(app)
				.post('/api/users/register')
				.send(newUserNoName)
				.expect('Content-Type', /json/)
				.expect(400, done)
		});
	});
});