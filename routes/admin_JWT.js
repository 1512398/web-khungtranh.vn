
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var passport = require('passport')
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretKeyHTHHIEUHUOANGTRUNGHIEU';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';
var jwtadmin = {}
var adminController = require('../controllers/adminController')
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload.admin);
    adminController.findOne({admin: jwt_payload.admin}, function(err, user) {
        if (err) {
            // return done(err, false);
        }
        if (user) {
            // return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

jwtadmin.verifyToken = function verifyToken(req,res,next){
    //Get auth header
    const bearerHeader=req.headers['authorization'];
    //check if undefine
    if (typeof bearerHeader!=='undefined'){
        //get token
        const bearer=bearerHeader.split(' ');
        const bearerToken=bearer[1];
        //next middleware
        jwt.verify(bearerToken,opts.secretOrKey,(err,authData)=>{
            if(err){
                res.sendStatus(403);
            }else{
                req.session.authData = authData;
                next();
            }
        });
    }else{
        //forbidden
        res.sendStatus(403);
    }
}

jwtadmin.login = function(req, res) {
    if(req.body.admin && req.body.password){
      var admin = req.body.admin;
    // usually this would be a database call:
    var admin = adminController.findOne(admin,function(admin){
        if( ! admin ){
            res.status(401).json({message:"Lỗi: không tồn tại người dùng!"});
          }
          if(admin.password === req.body.password) {
            // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
            var payload = {admin: admin.admin};
            var token = jwt.sign(payload, opts.secretOrKey,{expiresIn:'3000000s'});
            res.cookie('JWT',token);
            res.send(token)
          } else {
            res.status(401).json({message:"Password không hợp lệ"});
          }
    });
    }
  }
module.exports = jwtadmin;