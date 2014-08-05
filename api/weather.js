module.exports = function (app, request) {
    app.get('/api/v1/weather/coords/:lat/:lon', function (req, res) {
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
                    .send('<!doctype html><html><body><h1 style="text-align: center">502 Bad Gateway</h1></body></html>');
            }
        });

    });

    app.get('/api/v1/forecast/coords/:lat/:lon', function (req, res) {
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
                    .send('<!doctype html><html><body><h1 style="text-align: center">502 Bad Gateway</h1></body></html>');
            }
        });

    });

    app.get('/api/v1/weather/city/:city', function (req, res) {
        request('http://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&id=' + req.params.city, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                res.send(body)
                    .status(200);
            } else {
                res.status(502)
                    .send('<!doctype html><html><body><h1 style="text-align: center">502 Bad Gateway</h1></body></html>');
            }
        });

    });

    app.get('/api/v1/weather/cityname/:city', function (req, res) {
        request('http://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&q=' + req.params.city, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                res.send(body)
                    .status(200);
            } else {
                res.status(502)
                    .send('<!doctype html><html><body><h1 style="text-align: center">502 Bad Gateway</h1></body></html>');
            }
        });

    });

    app.get('/api/v1/forecast/city/:query', function (req, res) {
        var param = req.params.query;
//    console.log(req.params.query);
        request('http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&cnt=10&id=' + param, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                res.send(body)
                    .status(200);
            } else {
                res.status(502)
                    .send('<!doctype html><html><body><h1 style="text-align: center">502 Bad Gateway</h1></body></html>');
            }
        });

    });

    app.get('/api/v1/search/:query', function (req, res) {
        var param = req.params.query;
        request('http://api.openweathermap.org/data/2.5/find?mode=json&type=like&units=metric&appid=39236d7efbea4f7c0fda3217a63c177b&q=' + param, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                res.send(body)
                    .status(200);
            } else {
                res.status(502)
                    .send('<!doctype html><html><body><h1 style="text-align: center">502 Bad Gateway</h1></body></html>');
            }
        });

    });
};