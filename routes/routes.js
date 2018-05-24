module.exports = function (app, passport,paypal) {
    app.get('/', function(req, res){
        res.render('index');
    })
    
    app.get('/index', function(req, res){
        res.redirect('/');
    })
    
    app.get('/LienHe', function(req, res){
        res.render('LienHe');
    })
    
    app.get('/DatHang', function(req, res){
        res.render('DatHang');
    })

    app.get('/ThanhToan', function(req, res){
        res.render('ThanhToan');
    })
    
    app.get('/SanPham', function(req, res){
        res.render('SanPham');
    })

    app.post('/pay', function(req, res){
        const  create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:5000/success",
                "cancel_url": "http://localhost:5000/cancle"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "item",
                        "sku": "item",
                        "price": "1.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
                },
                "description": "This is the payment description."
            }]
        };
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for(let i = 0;i<payment.links.length;i++){
                    if(payment.links[i].rel === 'approval_url'){
                        res.redirect(payment.links[i].href);
                    }

                }
            }
        });
    });

    app.get('/success',function(req,res){
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        var execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
                }
            }]
        };
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                res.send('Success')
            }
        });
    });
    
    app.get('/cancle',function(req,res){
        res.send('cancled!')
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
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/DangKy', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.post('/DangNhap', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
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

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
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
