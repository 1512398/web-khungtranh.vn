module.exports = function (app, passport,jwt) {
    
    app.get('/', function (req, res) {
        res.render('index',{member: req.isAuthenticated(),name:'trangchu', title:'Trang chủ'});
        // renderHandler()
    })

    app.get('/index', function (req, res) {
        res.redirect('/');
    })

    app.get('/LienHe', function (req, res) {
        res.render('LienHe',{member: req.isAuthenticated(),title:'Liên hệ',name:'lienhe'});
    })
    app.get('/ThanhToan', function (req, res) {
        
        /*jwt.verify(req.token,'hthieuhoangtrunghieu',(err,authData)=>{
            if(err){
                res.redirect('/DangNhap')
            }else{
                res.render('ThanhToan', {price: req.session.cart.priceAll, count: req.session.cart.countAll});
            }
        });
    }   */
        res.render('ThanhToan', {member: req.isAuthenticated(), price: req.session.cart.priceAll, count: req.session.cart.countAll});
    })

    app.get('/getprofile',function (req,res) {
        res.json({name: String(req.user.fullName).replace(/\S* /g,''), avt: req.user.avtImg});
      })

    app.get('/DangKy', function (req, res) {
        res.render('DangKy', { message: req.flash('signupMessage') });
    });

    app.get('/DangNhap', function (req, res) {
        res.render('DangNhap', {title:'Đăng nhập', name:'dangnhap', message: req.flash('signinMessage') });
    });

    app.post('/DangKy',
        function(req,res,next){
            captcha = require('./captcha-verify.js');
            captcha(req,res,req.body['g-recaptcha-response'],function(stt){
                if (stt)
                {
                    return next();
                }    
                else
                { 
                    req.flash('signupMessage', 'Vui lòng kiểm tra lại mã captcha!')
                    return res.redirect('/DangKy')
                }
            })
            
        },
        passport.authenticate('local-signup', {
            successRedirect: '/', // redirect to the secure profile section
            failureRedirect: '/DangKy', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        })
        );

    
    app.post('/DangNhap', function(req,res,next){
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { res.redirect('/DangNhap'); }
            if (!user) { return res.redirect('/DangNhap'); }
            req.logIn(user, function(err) {
                if (err) { return res.redirect('/DangNhap'); }
                
                jwt.sign({user:user},'hthieuhoangtrunghieu',{expiresIn:'30000s'},(err,token)=>{
                    res.cookie('auth',token,{maxAge:60000000,httpOnly: true});
                    console.log(token);
                    res.redirect('/')
                });
            });
          },
        )(req, res, next);
    });

    app.get('/DangXuat', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


    app.get('/profile', isLoggedIn, function (req, res) {
        res.send('Wellcome :) ')
        
        // res.render('profile', req.User)
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function verifyToken(req,res,next){
    //Get auth header
    const bearerHeader=req.query.auth;
    console.log(bearerHeader);
    //check if undefine
    if (typeof bearerHeader!=='undefined'){
        //get token
        const bearer=bearerHeader.split(' ');
        const bearerToken=bearer[1];
        //set token to req
        req.token=bearerHeader;
        //next middleware
        next();
    }else{
        //forbidden
        res.sendStatus(403);
    }
}

function renderHandler(dest){
    jwt.verify(req.token,'hthieuhoangtrunghieu',(err,authData)=>{
        if(err){
            res.redirect('/DangNhap')
        }else{
            res.render(dest,{member:true});
        }
    });
}