const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

// import user schema
/* why this? - rationale found in 
 * https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
 * particulary - "Avoid exporting/requiring models — if any have refs to other models this can
 * lead to a dependency nightmare. Use var User = mongoose.model('user') instead of require." */
const User = require('./models/Users');

// pass passport variable and insert into configuration function 
const passportConf = require('./config/passport');

const userRoute = require('./routes/api/users');
const portfolioRoute = require('./routes/api/portfolio');

app.use(cors());
app.use(fileUpload());

//Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use Routes. Whenever the specified route is required, enter userRoute to handle it
app.use('/api/users', userRoute);
app.use('/api/portfolio', portfolioRoute);

// Serve Static assets (massive build file) if we are in production
if (process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

/*
// when a route doesn't exist
app.use((req, res, next) => {
    res.status(404).json({ error: "Page not found "}); 
});
*/

module.exports = app;