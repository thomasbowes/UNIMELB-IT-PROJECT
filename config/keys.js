module.exports = {
    mongoURI: `mongodb+srv://project:${process.env.DB_KEY}@cluster0.apwa9.mongodb.net/project?retryWrites=true&w=majority`,
    testMongoURI: `mongodb+srv://tester:${process.env.TESTDB_KEY}@cluster0.xacf4.mongodb.net/testing?retryWrites=true&w=majority`
};