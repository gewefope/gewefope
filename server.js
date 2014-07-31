var express = require('express')
    , request = require('request')
    , bodyParser = require('body-parser')
    , app = express()
    , cookieParser = require('cookie-parser')
    , session = require('express-session')
;

app.use(bodyParser());
app.use(bodyParser.json({ type: 'application/json', strict: false }));
app.use(cookieParser());
app.use(session({secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

require('./api/weather.js')(app, request);
require('./api/user.js')(app, request, session);
/*
 require('./api/encoder.js')(string)
 */

app.set('port', process.env.PORT || 3000);
app.use('/storage/js', express.static('dist/js'));
app.use('/storage/css', express.static('dist/css'));

app.get('/', function(req,res){
    res.status(200).sendfile('dist/pages/index.html');
});

app.get('/login', function(req,res){
    res.status(200).sendfile('dist/pages/login.html');
});

app.get('/signup', function(req,res){
    res.status(200).sendfile('dist/pages/signup.html');
});

app.get('/profile', function(req,res){
    res.status(200).sendfile('dist/pages/profile.html');
});

require('http').createServer(app).listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});
