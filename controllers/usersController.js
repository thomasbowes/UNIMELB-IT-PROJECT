const bcrypt  = require('bcryptjs');
const nodemailer = require("nodemailer");

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

    sendEmail(newUser.email, newUser._id);

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            if(err){
                console.log(err);
            }
            newUser.password = hash;
            newUser.save()
                .then(() => {
                    res.status(201).json({
                        status: 'Thank you for register - please confirm your email address',
                        data: newUser
                    });
                });
        });
    });
}


const sendEmail =  function(userEmail, userId) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'folio.exchange.team@gmail.com',
            pass: 'folioexchange'
        }
    });

    const mailOptions = {
        from: 'folio.exchange.team@gmail.com',
        to: userEmail,
        subject: 'Folio.Exchange - confirmation email',
        text: "Thank you for register with folio.exchange, Here is your conformation link:" + "Localhost: http://localhost:5000/users/confirmation/" + userId + " Heroku: " + userId
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


module.exports.registerNewUser = registerNewUser;