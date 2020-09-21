const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const userRoute = require('./routes/api/users');

// Authentication Middleware
// pass passport variable and insert into configuration function 
require('./config/passport')(passport);

app.use(cors());


//Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use Routes. Whenever the specified route is required, enter userRoute to handle it
app.use('/api/users', userRoute);

// when a route doesn't exist
app.use((req, res, next) => {
	res.status(404).json({ error: "Page not found "}); 
});

module.exports = app;