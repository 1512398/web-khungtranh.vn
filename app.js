var express = require('express');
var app = express();

// Use View Engine
var expressHbs = require('express-handlebars');
var paginateHelper = require('express-handlebars-paginate');
var hbs = expressHbs.create({
	extname			: 'hbs',
	defaultLayout	: 'layout_main', 
	layoutsDir		: __dirname + '/views/layouts/',
	partialsDir		: __dirname + '/views/partials/',
	helpers			: {
		paginate: paginateHelper.createPagination
	}
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

hbs.handlebars.registerHelper('notEmpty',function(text){
    if (text ==undefined)
    {
        return false;
    }
    if (text.length>0)
        return true;
    else
        return false;
});

//Public folder
app.use(express.static(__dirname + '/public'));

// Body Parser Middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//===== Login and Signup =====
var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');
app.use(session({ secret: 'hoangtrunghieutrunghieuhoang' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Seting up flash
var flash    = require('connect-flash');
app.use(flash()); // use connect-flash for flash messages stored in session

//===== Sync database =====
//Prepare database

var models = require('./models');
app.get('/sync', function(req, res){
	models.sequelize.sync().then(function(){
		res.send('database sync completed!');
	});
});

//load passport strategies
var user = require('./models/user')
console.log(models.User)
require('./config/passport.js')(passport, models.User);

//===== Paypal ======
var paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AadTle1CigTgjx1qEONv_JwQyHQ7yuexLicGX_wlTT32CzrVMUmZnwQMJ1H_tuUU8EV7RT4MpZZeAlKD',
    'client_secret': 'EHJFYLAlXgZgMnuE-Ownw2bvVZf3nG0sPIl9evhCYJS9mbcw0s545CqOc5U0mJEunj1AnwwaaiNHMvoZ'
  });


//===== Cong thanh toan Vietnam =====
const { OnePayDomestic } = require('vn-payments');
const { OnePayInternational } = require('vn-payments');
const { VNPay } = require('vn-payments');
const { SohaPay } = require('vn-payments');
const { NganLuong } = require('vn-payments')

const onepayIntl = new OnePayInternational({
    paymentGateway: 'https://mtf.onepay.vn/vpcpay/vpcpay.op',
    merchant: 'ONEPAY',
    accessCode: 'D67342C2',
    secureSecret: 'A3EFDFABA8653DF2342E8DAC29B51AF0'
  });


// Define your routes
require('./routes/routes.js')(app, passport, paypal);


// Set Server Port & Start Server
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
	console.log('Server is listening at port ' + app.get('port'));
});
