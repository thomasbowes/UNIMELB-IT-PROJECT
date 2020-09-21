const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

// Retrieving URI for test mongodb server
const db = require('../config/keys').testMongoURI;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});

const User = require('../models/Users');

describe('App test', () => {
	let server;

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
		server = app.listen(5001);
		return User.insertMany(tests);
	});

	after(async function() {
		await User.deleteMany({});
		await mongoose.connection.close();
		await server.close();
	});

	describe("Getting all users from database", () => {
		it("getting all users", function() {
			return request(app)
				.get('/api/users/alluser')
				.expect(200);
		});
	});	
});