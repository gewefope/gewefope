var express = require('express'),
    http = require('http'),
    path = require('path'),
    server = express();

// all environments
server.set('port', process.env.PORT || 3000);
//server.set('views', path.join(__dirname, '/dist/pages'));
//server.engine('html', require('ejs').renderFile);
//app.use(express.favicon());
server.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
server.use(express.methodOverride());
server.use(server.router);
//TODO: Разобраться со статическими файлами
server.use(express.static(path.join(__dirname, '/dist/public')));
//server.use(express.static(__dirname + '/dist/public'));
//server.use('/files', express.static('dist/public'));

// development only
if ('development' == server.get('env')) {
    server.use(express.errorHandler());
}

server.get('/', function (req, res) {
//    res.render(__dirname + '/dist/pages/index.html');
    //res.sendfile(__dirname + '/public/pages/index.html');
    res.sendfile(__dirname + '/dist/pages/index.html');
});

server.get('/search', function (req, res) {
//    res.render(__dirname + '/dist/pages/search.html');
    //res.sendfile(__dirname + '/public/pages/search.html');
    res.sendfile(__dirname + '/dist/pages/search.html');
});

server.get('/location', function (req, res) {
//    res.render(__dirname + '/dist/pages/location.html');
    //res.sendfile(__dirname + '/public/pages/location.html');
    res.sendfile(__dirname + '/dist/pages/location.html');
});

server.get('/city/:id', function (req, res) {
//    res.render(__dirname + '/dist/pages/city.html');
    //res.sendfile(__dirname + '/public/pages/city.html');
    res.sendfile(__dirname + '/dist/pages/city.html');
});


http.createServer(server).listen(server.get('port'), function () {
    console.log('Express server listening on port ' + server.get('port'));
});
