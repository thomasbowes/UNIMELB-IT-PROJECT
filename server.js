const mongoose = require('mongoose');

// DB Config
const db = require('./config/keys').mongoURI;

//connect to DB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err=>console.log(err));

const app = require('./app');

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`));