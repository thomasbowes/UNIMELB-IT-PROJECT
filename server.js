const mongoose = require('mongoose');

const path = require('path');

// DB Config
const db = require('./config/keys').mongoURI;

//connect to DB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err=>console.log(err));

const app = require('./app');

// Serve Static assets (massive build file) if we are in production
if (process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`));