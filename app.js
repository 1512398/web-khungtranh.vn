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
//Public folder
app.use(express.static(__dirname + '/public'));

// Body Parser Middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.get('/SanPham', function(req, res){
	res.render('SanPham');
})

// Set Server Port & Start Server
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
	console.log('Server is listening at port ' + app.get('port'));
});
