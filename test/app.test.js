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
	after(async function() {
		await User.deleteMany({});
		await mongoose.connection.close();
		await server.close();
	});

	// tests whether server returns all users in database
	// P.S this function isn't done yet, needs more tests 
	describe("Getting all users from database", () => {
		it("getting all users", function() {
			return request(app)
				.get('/api/users/alluser')
				.expect(200);
		});
	});	
});