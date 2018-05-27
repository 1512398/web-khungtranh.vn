//load bcrypt
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, user) {

    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    // load the auth variables
    var configAuth = require('./auth');


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });


    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            }
            else {
                done(user.errors, null);
            }
        });

    });

    passport.use('local-signup', new LocalStrategy(

        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {
            console.log('passport check!');
            
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne( 
                { where: { email: email } }).then(function (user) {

                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'Email đã được đăng ký!'));
                    }

                    else {
                        var userPassword = generateHash(password);
                        var data =
                            {
                                email: email,
                                phoneNum: req.body.phoneNum,
                                address: req.body.address,
                                password: userPassword,
                                fullName: req.body.fullname,
                            };


                        User.create(data).then(function (newUser, created) {
                            if (!newUser) {
                                return done(null, false);
                            }

                            if (newUser) {
                                return done(null, newUser);

                            }


                        });
                    }


                });
        }
    ));



    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL

    },

        // facebook will send back the token and profile
        function (token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function () {

                // find the user in the database based on their facebook id
                User.findOne({ where: { 'facebook_id': profile.id } }).then(function (err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook_id = profile.id; // set the users facebook id                   
                        newUser.facebook_token = token; // we will save the token that facebook provides to the user                    
                        newUser.facebook_name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook_email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function (err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });

        }));

    passport.use(new GoogleStrategy({

        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,

    },
        function (token, refreshToken, profile, done) {

            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Google
            process.nextTick(function () {

                // try to find the user based on their google id
                User.findOne({ where: { 'google_id': profile.id } }).then(function (err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if a user is found, log them in
                        return done(null, user);
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser = new User();

                        // set all of the relevant information
                        newUser.google_id = profile.id;
                        newUser.google_token = token;
                        newUser.google_name = profile.displayName;
                        newUser.google_email = profile.emails[0].value; // pull the first email

                        // save the user
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });

        }));
    //LOCAL SIGNIN
    passport.use('local-login', new LocalStrategy(

        {

            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {

            var User = user;

            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }

            User.findOne({ where: { email: email } }).then(function (user) {

                if (!user) {
                    return done(null, false, req.flash('signinMessage', 'Email đăng nhập không đúng'));
                }

                
                if (!isValidPassword(user.password, password)) {

                    return done(null, false, req.flash('signinMessage', 'Mật khẩu không đúng'));

                }

                var userinfo = user.get();
                return done(null, userinfo);

            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false, req.flash('signinMessage', 'Technical problems!'));


            });

        }
    ));

};

// function isValidPassword  (userpass, password) {
//     return bCrypt.compareSync(password, userpass);
// };

// module.exports = isValidPassword;