const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoute = require('./routes/api/users');

const app = express();


//Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

//connect to DB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err=>console.log(err));


// Use Routes. Whenever the specified route is required, enter userRoute to handle it
app.use('/api/users', userRoute);


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`));