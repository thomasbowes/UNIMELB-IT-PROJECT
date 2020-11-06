const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Point to the file storing environment variables, in order to use them in the nodejs app
dotenv.config({ path: './.env' });

// DB Config
DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_KEY);

//connect to DB
mongoose.set('useFindAndModify', false);
mongoose.connect( DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err=>console.log(err));

const app = require('./app');

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`));