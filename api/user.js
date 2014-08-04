module.exports = function (app, request) {
    app.post('/api/v1/user/signup', function (req, res) {
        //TODO: Переделать на парсинг тела запроса
        var userData = {
            'username': base64.decode(req.param('ZW1haWw')),
            'password': base64.decode(req.param('cGFzc3dvcmQ')),
            'full_name': base64.decode(req.param('ZnVsbG5hbWU'))
        };

        if (userData.username === '' || userData.password === '') {
            res.status(400).send('{code: 400, error: \'Invalid email or password\'}');
        } else {
            request({
                    url: 'https://api.parse.com/1/users',
                    method: 'POST',
                    headers: {
                        'X-Parse-Application-Id': 'i9zXXLCVxa2uoJSNLTMqCphcVE6TTbYg2Z0CUePB',
                        'X-Parse-REST-API-Key': '1vuZo4FGudiLWwgUCV9aAuBmI07kCrJfTmLHuxLz',
                        'Content-Type': 'application/json'
                    },
                    body: '{"username":"' + userData.username + '", "password":"' + userData.password + '", "full_name":"' + userData.full_name + '"}'
                },
                function (error, response, body) {
                    if (!error) {
                        if (response.statusCode === 201) {
                            res.status(201).send(body);
                        } else if (response.statusCode === 202) {
                            res.status(202).send(body);
                        } else {
                            res.status(200).send(body);
                        }
                    } else {
                        res.status(502).send("{error: 'Bad Getaway'}");
                    }
                });
        }
    });

    app.get('/api/v1/user/login', function (req, res) {
        var userData = {
            'username': base64.decode(req.param('ZW1haWw')),
            'password': base64.decode(req.param('cGFzc3dvcmQ'))
        };

//        console.log(encodeURI(JSON.stringify({"username": req.param('username'),"password": req.param('password')})));
        request({
                url: 'https://api.parse.com/1/login',
                method: 'GET',
                headers: {
                    'X-Parse-Application-Id': 'i9zXXLCVxa2uoJSNLTMqCphcVE6TTbYg2Z0CUePB',
                    'X-Parse-REST-API-Key': '1vuZo4FGudiLWwgUCV9aAuBmI07kCrJfTmLHuxLz',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"username": userData.username, "password": userData.password})
            },
            function (error, response, body) {
                if (!error) {
                    res.status(200).send(body);
                } else {
                    res.status(502).send("{error: 'Bad Getaway'}");
                }
            });
    });

    app.get('/api/v1/user/me', function (req, res) {
        request({
                url: 'https://api.parse.com/1/users/me',
                method: 'GET',
                headers: {
                    'X-Parse-Application-Id': 'i9zXXLCVxa2uoJSNLTMqCphcVE6TTbYg2Z0CUePB',
                    'X-Parse-REST-API-Key': '1vuZo4FGudiLWwgUCV9aAuBmI07kCrJfTmLHuxLz',
                    'X-Parse-Session-Token': req.param('sid')
                }
            },
            function (error, response, body) {
                if (!error) {
                    res.status(200).send(body);
                } else {
                    res.status(502).send("{error: 'Bad Getaway'}");
                }
            });
    });

    app.put('/api/v1/user/update/:userid', function (req, res) {
//        var updateString = {};
        var updateString = req.param('updateString');
        request({
                url: 'https://api.parse.com/1/users/' + req.params.userid,
                method: 'PUT',
                headers: {
                    'X-Parse-Application-Id': 'i9zXXLCVxa2uoJSNLTMqCphcVE6TTbYg2Z0CUePB',
                    'X-Parse-REST-API-Key': '1vuZo4FGudiLWwgUCV9aAuBmI07kCrJfTmLHuxLz',
                    'X-Parse-Session-Token': req.param('sid'),
                    'Content-Type': 'application/json'
                },
                body: updateString
            },
            function (error, response, body) {
                if (!error) {
                    res.status(200).send(body);
                } else {
                    res.status(502).send("{error: 'Bad Getaway'}");
                }
            });
    });

    app.get('/api/v1/user/profile/:emailHash', function (req, res) {
        request({
                url: 'http://ru.gravatar.com/' + req.params.emailHash,
                method: 'GET'
            },
            function (error, response, body) {
                if (!error) {
                    res.status(response.statusCode).send(body);
                } else {
                    res.status(502).send("{error: 'Bad Getaway'}");
                }
            });
    });

    var base64 = {};

    base64.encode = function (unencoded) {
        return new Buffer(unencoded || '').toString('base64');
    };

    base64.decode = function (encoded) {
        return new Buffer(encoded || '', 'base64').toString('utf8');
    };




};

