const bcrypt  = require('bcryptjs');
const nodemailer = require("nodemailer");

const User = require('./../models/Users');


// Get all the users
const getAllUser =  (req, res) => {
    try{
        User.find()
            .sort({date: -1})
            .then(users => res.json(users))
    } catch (err) {
        res.status(404).json({
            status: 'failure',
            message: err
        });
    }
};

//register new user
const registerNewUser = function(req, res){

    //check the email
    const email = req.body.email;

    User.findOne({email: email})
        .then(foundObject => {
           if(foundObject){
               res.status(200).json({
                   status: 'Email is already registered',
               });
           }
           else{

               //create new user
               let newUser = new User({
                   email:req.body.email,
                   username:req.body.username,
                   password:req.body.password
               });

               //send confirmation email
               sendEmail(newUser.email, newUser._id);

               //hash the password
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
                               });
                           });
                   });
               });
           }
        });
}

//send confirmation email
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
        text: "Thank you for register with folio.exchange, Here is your conformation link:" + "Localhost: http://localhost:5000/api/users/confirmation/" + userId + " Heroku: " + userId
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

//confirm the email address
const userEmailConfirmation = function(req, res){
    const userId = req.params.userId;

    if(userId.length != 24)
    {
        console.log('We could not found the verify link, please make sure it is correct');
        res.redirect('http://localhost:3000/');
        return;
    }

    User.findOne({_id: userId})
        .then(foundObject => {

            if(!foundObject){
                console.log('We could not found the verify link, please make sure it is correct');
                res.redirect('http://localhost:3000/');
            }
            else{
                foundObject.confirm = true;
                foundObject.save();
                console.log('Thank you, your unimelb email address have been verified. You can login now!');
                res.redirect('http://localhost:3000/');
            }
    });

}

module.exports.registerNewUser = registerNewUser;
module.exports.getAllUser = getAllUser;
module.exports.userEmailConfirmation = userEmailConfirmation;