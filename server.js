var express = require('express'),
    server = express(),
    request = require('request')
    ;


server.set('port', process.env.PORT || 3000);

server.use(express.logger('dev'));

//server.use(express.methodOverride());
server.use(server.router);
server.use(express.static(require('path').join(__dirname, '/dist/public')));

// development only
if ('development' == server.get('env')) {
    server.use(express.errorHandler());
}

server.get('/', function (req, res) {
    res.status(200)
        .set('Content-Type', 'text/html')
        .sendfile(__dirname + '/dist/pages/index.html')
    ;
});



server.get('/search', function (req, res) {
    res.status(200)
        .set('Content-Type', 'text/html')
        .sendfile(__dirname + '/dist/pages/search.html')
    ;
});

server.get('/location', function (req, res) {
    res.status(200)
        .set('Content-Type', 'text/html')
        .sendfile(__dirname + '/dist/pages/location.html')
    ;
});

server.get('/city/:id', function (req, res) {
    res.status(200)
        .set('Content-Type', 'text/html')
        .sendfile(__dirname + '/dist/pages/city.html')
    ;
});





// Weather api


//server.get('/api/:first/:second/:third/:four', function (req, res) {
//    var param = {
//        first: req.params.first,
//        second: req.params.second,
//        third: req.params.third,
//        four: req.params.four,
//        host: 'http://api.openweathermap.org/data/2.5/',
//        params: 'mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b'
//    };
//
//    if (param.first == 'search') {
//        request(param.host + 'find?' + param.params + '&q=' + param.second, function (err, response, body) {
//            if (!err && response.statusCode == 200) {
//                res.send(body);
//            } else {
//                res.status(502)
//                    .send('502');
//            }
//        });
//    }
//
//});

server.get('/api/weather/coords/:lat/:lon', function (req, res) {
    var param = {
        lat: req.params.lat,
        lon: req.params.lon
    };
    request('http://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&lat=' + param.lat + '&lon=' + param.lon, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            res.send(body)
                .status(200);
        } else {
            res.status(502)
                .send('502');
        }
    });

});

server.get('/api/forecast/coords/:lat/:lon', function (req, res) {
    var param = {
        lat: req.params.lat,
        lon: req.params.lon
    };
    request('http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&cnt=10&lat=' + param.lat + '&lon=' + param.lon, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            res.send(body)
                .status(200);
        } else {
            res.status(502)
                .send('502');
        }
    });

});

server.get('/api/weather/city/:city', function (req, res) {
    request('http://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&id=' + req.params.city, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            res.send(body)
                .status(200);
        } else {
            res.status(502)
                .send('502');
        }
    });

});

server.get('/api/forecast/city/:query', function (req, res) {
    var param = req.params.query;
//    console.log(req.params.query);
    request('http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&cnt=10&id=' + param, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            res.send(body)
                .status(200);
        } else {
            res.status(502)
                .send('502');
        }
    });

});

server.get('/api/search/:query', function (req, res) {
    var param = req.params.query;
    request('http://api.openweathermap.org/data/2.5/find?mode=json&type=like&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&q=' + param, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            res.send(body)
                .status(200);
        } else {
            res.status(502)
                .send('502');
        }
    });

});







server.use(function (req, res) {
    res.status(404)
        .set('Content-Type', 'text/html')
        .send('404')
        //.sendfile(__dirname + '/server/404.html')
    ;
});

require('http').createServer(server).listen(server.get('port'), function () {
    console.log('Server listening on port ' + server.get('port'));
});
