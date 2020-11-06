const bcrypt  = require('bcryptjs');
const nodemailer = require("nodemailer");
const validator = require('validator');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Point to the file storing environment variables, in order to use them in the nodejs app
dotenv.config({ path: './.env' });

// needed to generate and sign token 
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const ProfileBlock = mongoose.model('ProfileBlock');

// Test which environment is the app running in for mailOptions and userEmailConfirmation
const isDevelopment = function() {
  if(process.env.NODE_ENV === 'development'){
    return true;
  }
  else if (process.env.NODE_ENV === 'production'){
    return false;
  }
};

// if auth is successful, create a token
const signToken = (user) => {
  const token = jwt.sign({
      userId: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
      iat: Date.now()
    },  
    process.env.JWT_KEY, 
    {
      // IMPORTANT
      expiresIn: "15m"
    }
  );
  return token;
};

const signRefreshToken = (user) => {
  const token = jwt.sign({
      userId: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
      iat: Date.now()
    },  
    process.env.REFRESH_JWT_KEY, 
    {
      // IMPORTANT
      expiresIn: "1d"
    }
  );
  return token;
};

// Middleware to check the input body is ok
const checkBody = (req, res, next) => {
  
  // Check the required fields are not missing from input
  if(!req.body.lastname || !req.body.firstname || !req.body.email || !req.body.password){
    return res.status(400).json({
        status: "Missing firstname, lastname, email, or password"
    });                  
  }

  // Check that the input email is indeed an email
  else if( !(validator.isEmail(req.body.email)) ){
    return res.status(400).json({
      status: "Invalid Email"
    });
  }

  next();
}

// Get all the users
const getAllUser = (req, res) => {
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

/* Logins in user to website assuming that correct email and password is given */
const loginUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      // in the case that empty array is received (no user exists)
      if (!user) {
        return res.status(401).json({
          message: 'Email or Password is incorrect'
        })
      }
      /* comparing passwords between database and given request 
       * response parameter is true or false depending if passwords matches */
      bcrypt.compare(req.body.password, user.password, (err, response) => {
        if (err) {
          return res.status(401).json({
            message: 'Email or Password is incorrect'
          })
        }
        if (response) {
          if (user.confirm) {
            const token = signToken(user);
            const refreshToken = signRefreshToken(user);
            return res.status(200).json({
              message: 'Login successful',
              userAuthToken: {
                email: user.email,
                firstname: user.firstname,
                isAdmin: user.isAdmin,
                lastname: user.lastname,
                token: token,
                refresh_token: refreshToken,
                _id: user._id
              }
            });
          } else {
            return res.status(401).json({
              message: "Confirm your email"
            });
          }
        }
        return res.status(401).json({
          message: 'Email or Password is incorrect'
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    }); 
};

//register new user
const registerNewUser = function(req, res){
    
    //check the email
    const email = req.body.email;

    User.findOne({email: email})
        .then(foundObject => {
           if(foundObject){
               // checking if user details contain facebook or google id
               if (foundObject.facebookID || foundObject.googleID) {
                 // if user has already registered locally, reject request
                 if (foundObject.password) {
                     res.status(200).json({
                         status: 'Email is already registered'
                     });
                 // if user hasn't registered locally, do so
                 } else {
                     //hash the password
                     bcrypt.genSalt(10, function(err, salt){
                         bcrypt.hash(req.body.password, salt, function(err, hash){
                             if(err){
                                 console.log(err);
                             }
                             foundObject.firstname = req.body.firstname;
                             foundObject.lastname = req.body.lastname;
                             foundObject.password = hash;
                             foundObject.save()
                                 .then(() => {
                                     res.status(200).json({
                                         status: 'Thank you for registering - Please log in'
                                     });
                                 });
                         });
                     });
                 }
               } else { 
                 res.status(200).json({
                     status: 'Email is already registered'
                 });
               }
           }
           else{

               //create new user
               let newUser = new User({
                   email:req.body.email,
                   firstname:req.body.firstname,
                   lastname:req.body.lastname,
                   password:req.body.password
               });

               //send confirmation email
               sendEmail(newUser.email, newUser._id, newUser.firstname,  newUser.lastname);

               //hash the password
               bcrypt.genSalt(10, function(err, salt){
                   bcrypt.hash(newUser.password, salt, function(err, hash){
                       if(err){
                           console.log(err);
                       }
                       newUser.password = hash;
                       newUser.save()
                           .then(() => {
                               let combinedName = newUser.firstname + " " + newUser.lastname;
                               // autogenerate new profile block for new user
                               const newProfile = new ProfileBlock({
                                   user_id: newUser._id,
                                   name: combinedName,
                                   email: newUser.email
                               });

                               newProfile.save()
                                   .then(() => {
                                       res.status(201).json({
                                           status: 'Thank you for registering - Please confirm your email address.'
                                       });
                                   });
                           });
                   });
               });
           }
        });
};

//send confirmation email
const sendEmail =  function(userEmail, userId, userFirstname, UserLastname) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'folio.exchange.team@gmail.com',
            pass: process.env.EMAILPW
        }
    });

    //The HTML code for making confirmation email prettier
    let data = "<!DOCTYPE html PUBLIC \"-\/\/W3C\/\/DTD XHTML 1.0 Transitional \/\/EN\" \"http:\/\/www.w3.org\/TR\/xhtml1\/DTD\/xhtml1-transitional.dtd\">\r\n" +
        "<html xmlns=\"http:\/\/www.w3.org\/1999\/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:v=\"urn:schemas-microsoft-com:vml\">\r\n" +
        "<head>\r\n\r\n<meta content=\"text\/html; charset=utf-8\" http-equiv=\"Content-Type\">\r\n<meta content=\"width=device-width\" name=\"viewport\">" +
        "\r\n\r\n<meta content=\"IE=edge\" http-equiv=\"X-UA-Compatible\">\r\n\r\n<\/head><body>\r\n    " +
        "<div class=\"background\" style=\"background-color:rgb(3, 76, 113); font:1em sans-serif; height:inherit; padding-bottom:6rem; padding-top:3rem\" bgcolor=\"rgb(3, 76, 113)\" height=\"inherit\">\r\n      " +
        "<img src=\"https:\/\/res.cloudinary.com\/dg3osx8ob\/image\/upload\/v1602860266\/logo_upyyhw.png\" alt=\"logo\" style=\"display:block; margin:0 auto; max-width:40rem; width:72%\" width=\"72%\">\r\n      " +
        "<div class=\"email-body\" style=\"align-items:center; background-color:rgb(243, 246, 248); margin:0 auto; margin-top:3rem; max-width:50rem; padding:1rem; width:90%\" bgcolor=\"rgb(243, 246, 248)\" width=\"90%\">\r\n          " +
        "<h1 style=\"text-align:center\" align=\"center\">Please verify your email address<\/h1>\r\n          " +
        "<p style=\"margin:0; text-align:center\" align=\"center\">Dear " +
        userFirstname +" " + UserLastname +
        ", Thank you for signing up to Portfolio.Exchange!<\/p>\r\n          " +
        "<p style=\"margin:0; text-align:center\" align=\"center\">Please confirm your e-mail by either clicking the button below<\/p>\r\n          " +
        "<a href=\"" +
        process.env.DOMAIN + "/api/users/confirmation/" + userId + "\"" +
        "class=\"link\" style=\"background-color:rgb(100, 203, 140); border-radius:1.2rem; color:white; display:block; font-weight:bolder; margin:1.5rem auto; padding:1rem; text-align:center; text-decoration:none; width:8rem\" bgcolor=\"rgb(100, 203, 140)\" align=\"center\" width=\"8rem\">Verify E-Mail" +
        "<\/a>\r\n          <p style=\"margin:0; text-align:center\" align=\"center\">Clicking the below link:<\/p>\r\n          " +
        "<p style=\"margin:0; text-align:center\" align=\"center\">" +
        process.env.DOMAIN + "/api/users/confirmation/" + userId +
        "<\/p>" +
        "\r\n      " +
        "<\/div>\r\n    <\/div>\r\n<\/body>\r\n<\/html>"


    const mailOptions = {
        from: 'folio.exchange.team@gmail.com',
        to: userEmail,
        subject: 'Folio.Exchange - confirmation email',
        html: data
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

//confirm the email address
const userEmailConfirmation = function(req, res){
    const userId = req.params.userId;
    
    if(userId.length != 24)
    {
        console.log('We could not find the verify link, please make sure it is correct');
        if(isDevelopment() === true){
            res.redirect('http://localhost:3000/not_found')
        } else {
            //res.redirect('https://folio-exchange.herokuapp.com/not_found');
            res.redirect(process.env.DOMAIN + '/not_found');
        }
        return;
    }

    User.findOne({_id: userId})
        .then(foundObject => {

            if(!foundObject){
                console.log('We could not find the verify link, please make sure it is correct');
                if(isDevelopment() === true){
                    res.redirect('http://localhost:3000/not_found')
                } else {
                    //res.redirect('https://folio-exchange.herokuapp.com/not_found');
                    res.redirect(process.env.DOMAIN + '/not_found');
                }
            }
            else{
                foundObject.confirm = true;
                foundObject.save();
                console.log('Thank you, your email address has been verified. You can login now!');
                if(isDevelopment() === true){
                    console.log('isDevelopment is true');
                    res.redirect('http://localhost:3000/home/notification/welcome')
                } else {
                    //res.redirect('https://folio-exchange.herokuapp.com/home/notification/welcome');
                    res.redirect(process.env.DOMAIN + '/home/notification/welcome');                    
              }
            }
            
        })
        .catch(error => {
            console.log('We could not find the verify link, please make sure it is correct');
            if(isDevelopment() === true){
                res.redirect('http://localhost:3000/not_found')
            } else {
                //res.redirect('https://folio-exchange.herokuapp.com/not_found');
                res.redirect(process.env.DOMAIN + '/not_found');
            }
        });
};

// to test if access token is valid and return payload if it is
const testUser = (req, res) => {
  res.status(200).json({
    userInfo: req.user,
    status: true
  });
};

// to refresh both access token and refresh token
const refreshTokens = (req, res) => {
  if (req.body.refresh_token) {
    // verify if refresh token given is still valid
    jwt.verify(req.body.refresh_token, process.env.REFRESH_JWT_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "Token is invalid",
          status: false
        });
      } else {
        // optimised code, don't need to search database EVERYTIME

        const user = {
          _id: decoded.userId,
          firstname: decoded.firstname,
          lastname: decoded.lastname,
          email: decoded.email,
          isAdmin: decoded.isAdmin
        };

        const token = signToken(user);
        const refreshToken = signRefreshToken(user);
        res.status(201).json({
          message: "Successfully created tokens",
          token: token,
          refresh_token: refreshToken,
          status: true
        });

        // User.findOne({_id: decoded.userId})
        //   .then(user => {
        //     const token = signToken(user);
        //     const refreshToken = signRefreshToken(user);
        //     res.status(201).json({
        //       message: "Successfully created tokens",
        //       token: token,
        //       refresh_token: refreshToken,
        //       status: true
        //     });
        //   })
        //   .catch(err => {
        //     res.status(500).json({
        //       message: "Database error",
        //       status: false,
        //       error: err
        //     });
        //   });
      }
    });
  } else {
    res.status(401).json({
      message: "Token not provided",
      status: false
    });
  }
};


// function dedicated to changing permissible user details (first, last name and password)
const changeDetails = (req, res) => {
  const userid = req.user._id;
  const query = { _id: userid };  

  if (!req.body.contents) {
    return res.status(401).json({
      status: "Include body of change"
    });
  }

  // if password is included, make sure to encode it 
  if (req.body.contents.password != undefined) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.contents.password, salt);
    req.body.contents.password = hash;
  }

  User
    // req.body.contents is an object that contains the fields we want to change in an item block
    .findOneAndUpdate(query, req.body.contents, {upsert: true, new: true})
    .then(item => {
      res.status(200).json({
        status: "User details have been successfully updated",
        userDetails: item
      });
    })
    .catch(error => {
      res.status(500).json({
        status: "An error has occurred trying to update user details",
        err: error
      });
    })
};

/* Please note:  The search algorithm implemented here was based on a search in the User collection, followed by 
                search in the ProfileBlock collection.  A simpler algorithm could have been implemented here, i.e.
                search in the ProfileBlock ONLY.  Two reasons why the simpler algorithm is not used: 1) Keep the code
                as a template for handling complex search across different collections in db. 2) Time constrains for
                this assignment 
*/


/* Find the urlProfile in ProfileBlock, and include it with the result of searchUser
  Input: Array of users (i.e. result of searchUser)
  Output: A single promise that will resolve to an array of resolved value of individual promises
          (i.e. array of user object with the urlProfile inserted)
*/
const searchUrlProfile = docUsers => {

  const docPromises = docUsers.map(oneUser => {
    
    let userWithUrl = oneUser.toObject();
    profileBlockPromise = ProfileBlock.find({_id: oneUser._id}, 'urlProfile title aboutMe user_id' ).exec();
    return profileBlockPromise.then(doc => {
      
      // Matching ProfileBlock has been found, insert urlProfile, title, aboutMe and user_id in final result
      if(doc.length === 1) {
        userWithUrl["urlProfile"] = doc[0].urlProfile;
        userWithUrl["user_id"] = doc[0].user_id;
        // These two fields are not required, hence not necessarily present
        if(doc[0].title){
          userWithUrl["title"] = doc[0].title;
        }
        else{
          userWithUrl["title"] = "";
        }
        if(doc[0].aboutMe){
          userWithUrl["aboutMe"] = doc[0].aboutMe;
        }
        else{
          userWithUrl["aboutMe"] = "";
        }
      }
      // No match has been found. Mark the url as empty
      else if(doc.length === 0){
        userWithUrl["urlProfile"] = "";
        userWithUrl["title"] = "";
        userWithUrl["aboutMe"] = "";
        userWithUrl["user_id"] = "";
      }
      // Something went wrong. There should be only one match. 
      else if(doc.length > 1){
        console.log("More than one profile block has been found, something went wrong");
        userWithUrl["urlProfile"] = "";
        userWithUrl["title"] = "";
        userWithUrl["aboutMe"] = "";
        userWithUrl["user_id"] = "";
      }

      return userWithUrl;
    })
    .catch(err => {
      console.log("Something went wrong in searchUrlProfile: " + err);
    });

  });

  return Promise.all(docPromises);
}


// Find all matching users in the database, returning a promise to be handled later
const searchUsers = searchStr => {

  let rexp;
  let queryPromise;
  const cleanedStr = searchStr.trim();
  
  // Input is an email address
  if( validator.isEmail(cleanedStr)){
    rexp = new RegExp(cleanedStr, 'i');
    queryPromise = ProfileBlock.find( {email: rexp}, 'name email' )
                      .exec();
  } 
  // Else, assume input is a name.
  else {

    rexp = new RegExp(cleanedStr, 'i');
    queryPromise = ProfileBlock.find( {name: rexp}, 'name email' )
                                .exec();


  }

  return queryPromise;
}


// Return the search-user results that is ready to be used by frontend
const returnSearchUserResults = (req, res) => {

  // The user has input something
  if (req.query.key){
    searchUsers(req.query.key)
    .then(doc => {
      
      // No match has been found
      if(doc.length === 0){
        res.status(200).json({message: 'No matching result'});
      }
      // Matches have been found
      else if (doc.length > 0){
        return searchUrlProfile(doc)
              .then( docWithUrlProfile => {
                    res.status(200).json({
                      message: "Matches have been found",
                      data: docWithUrlProfile
                    });
              })
              .catch(err => {
                res.status(500).json({
                  message: 'Something went wrong in returnSearchUserResults'
                })
              });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Something went wrong in returnSearchUserResults'
      });
    });
  }

  // The user has input nothing
  else {
    res.status(400).json({
      message: "Please input something to search for"
    });
  }

}

module.exports = { signToken, signRefreshToken };
module.exports.registerNewUser = registerNewUser;
module.exports.loginUser = loginUser;
module.exports.getAllUser = getAllUser;
module.exports.userEmailConfirmation = userEmailConfirmation;
module.exports.testUser = testUser;
module.exports.checkBody = checkBody;
module.exports.refreshTokens = refreshTokens;
module.exports.changeDetails = changeDetails;
module.exports.returnSearchUserResults = returnSearchUserResults;