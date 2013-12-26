var express = require('express'),
    http = require('http'),
    path = require('path'),
    server = express();

// all environments
server.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'public'));
//app.use(express.favicon());
server.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
server.use(server.router);
//TODO: Разобраться со статическими файлами
//server.use(express.static(path.join(__dirname + '/dist/public/')));
server.use(express.static(__dirname + '/dist/public'));
//server.use('/files', express.static('dist/public'));

// development only
if ('development' == server.get('env')) {
    server.use(express.errorHandler());
}

server.get('/', function (req, res) {
    //res.render('public/index.html');
    //res.sendfile(__dirname + '/public/pages/index.html');
    res.sendfile(__dirname + '/pages/index.html');
});

server.get('/search', function (req, res) {
    //res.render('public/search.html');
    //res.sendfile(__dirname + '/public/pages/search.html');
    res.sendfile(__dirname + '/pages/search.html');
});

server.get('/location', function (req, res) {
    //res.render('public/location.html');
    //res.sendfile(__dirname + '/public/pages/location.html');
    res.sendfile(__dirname + '/pages/location.html');
});

server.get('/city/:id', function (req, res) {
//    res.render('public/city.html');
    //res.sendfile(__dirname + '/public/pages/city.html');
    res.sendfile(__dirname + '/pages/city.html');
});


http.createServer(server).listen(server.get('port'), function () {
    console.log('Express server listening on port ' + server.get('port'));
});
