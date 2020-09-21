const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const passport = require('passport');


const userRoute = require('./routes/api/users');
const portfolioRoute = require('./routes/api/portfolio');

// Authentication Middleware
// pass passport variable and insert into configuration function 
require('./config/passport')(passport);

const app = express();

app.use(cors());
app.use(fileUpload());


//Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Config
const db = require('./config/keys').mongoURI;

//connect to DB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err=>console.log(err));


// Use Routes. Whenever the specified route is required, enter userRoute to handle it
app.use('/api/users', userRoute);
app.use('/api/portfolio', portfolioRoute);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`));