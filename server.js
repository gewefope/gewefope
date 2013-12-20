
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express();

// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'public'));
//app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname + 'dist/public/')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req, res) {
    //res.render('public/index.html');
    //res.sendfile(__dirname + '/public/pages/index.html');
    res.sendfile(__dirname + 'dist/pages/index.html');
});

app.get('/search', function (req, res) {
    //res.render('public/search.html');
    //res.sendfile(__dirname + '/public/pages/search.html');
    res.sendfile(__dirname + 'dist/pages/search.html');
});

app.get('/location', function (req, res) {
    //res.render('public/location.html');
    //res.sendfile(__dirname + '/public/pages/location.html');
    res.sendfile(__dirname + 'dist/pages/location.html');
});

app.get('/city/:id', function (req, res) {
//    res.render('public/city.html');
    //res.sendfile(__dirname + '/public/pages/city.html');
    res.sendfile(__dirname + 'dist/pages/city.html');
});




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
