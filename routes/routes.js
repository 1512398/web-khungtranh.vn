module.exports = function (app, passport) {

    app.get('/', function (req, res) {
        res.render('index');
    })

    app.get('/index', function (req, res) {
        res.redirect('/');
    })

    app.get('/LienHe', function (req, res) {
        res.render('LienHe');
    })

    app.get('/DatHang', function (req, res) {
        res.render('DatHang');
    })

    app.get('/ThanhToan', function (req, res) {
        res.render('ThanhToan');
    })

    app.get('/SanPham', function (req, res) {
        res.render('SanPham');
    })

    app.get('/DangKy', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('DangKy', { message: req.flash('signupMessage') });
    });

    app.get('/DangNhap', function (req, res) {
        res.render('DangNhap', { message: req.flash('signinMessage') });
        // res.render('DangNhap');
    });
    app.post('/DangKy', passport.authenticate('local-signup', {
        successRedirect: '/CapNhatThongTin', // redirect to the secure profile section
        failureRedirect: '/DangKy', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.post('/DangNhap', passport.authenticate('local-login', {
        successRedirect: '/CapNhatThongTin', // redirect to the secure profile section
        failureRedirect: '/DangNhap', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

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
