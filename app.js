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

///===== Sync database =====
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


// Define your routes
require('./routes/routes.js')(app, passport);


// Set Server Port & Start Server
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
	console.log('Server is listening at port ' + app.get('port'));
});
