const bcrypt  = require('bcryptjs');

const User = require('./../models/Users');


// Get all the users
exports.getAllUser = async (req, res) => {
    try{
        await User.find()
        .sort({date: -1})
        .then(users => res.json(users))
    } catch (err) {
        res.status(404).json({
            status: 'failure',
            message: err
        });
    }
};


// Create a new user from user input (req.body) ASYNC
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newUser
        });

    } catch (err) {
        res.status(400).json({
            status: 'failure',
            message: err
        });
    }
};


const registerNewUser = function(req, res){

    let newUser = new User({
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    });

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            if(err){
                console.log(err);
            }
            newUser.password = hash;
            newUser.save()
                .then(() => {
                    res.status(201).json({
                        status: 'success',
                        data: newUser
                    });
                });
        });
    });
}

module.exports.registerNewUser = registerNewUser;