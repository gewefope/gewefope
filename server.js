var express = require('express'),
    http = require('http'),
    path = require('path'),
    server = express();


server.set('port', process.env.PORT || 3000);

server.use(express.logger('dev'));

server.use(express.methodOverride());
server.use(server.router);
server.use(express.static(path.join(__dirname, '/dist/public')));

// development only
if ('development' == server.get('env')) {
    server.use(express.errorHandler());
}

server.get('/', function (req, res) {
    res.status(200)
        .set('Content-Type', 'text/html')
        .sendfile(__dirname + '/dist/pages/index.html');
});

server.get('/search', function (req, res) {
    res.status(200)
        .set('Content-Type', 'text/html')
        .sendfile(__dirname + '/dist/pages/search.html');
});

server.get('/location', function (req, res) {
    res.status(200)
        .set('Content-Type', 'text/html')
        .sendfile(__dirname + '/dist/pages/location.html');
});

server.get('/city/:id', function (req, res) {
    res.status(200)
        .set('Content-Type', 'text/html')
        .sendfile(__dirname + '/dist/pages/city.html');
});

server.use(function (req, res) {
        res.status(404)
            .set('Content-Type', 'text/html')
            .send('404');
            //.sendfile(__dirname + '/server/404.html');
});

http.createServer(server).listen(server.get('port'), function () {
    console.log('Express server listening on port ' + server.get('port'));
});
