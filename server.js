var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express(),
    cookieParser = require('cookie-parser')
    ;

app.use(bodyParser());
app.use(bodyParser.json({ type: 'application/json', strict: false }));
app.use(cookieParser());

require('./api/weather.js')(app, request);
require('./api/user.js')(app, request);
/*
 require('./api/encoder.js')(string)
 */

app.set('port', process.env.PORT || 3000);
app.use('/storage/js', express.static('dist/js'));
app.use('/storage/css', express.static('dist/css'));

app.get('/', function (req, res) {
    checkAuth(req.cookies.sid, function () {
        res.redirect('/home');
    }, function () {
        res.status(200).sendfile('dist/pages/index.html');
    });


});

app.get('/login', function (req, res) {
    checkAuth(req.cookies.sid, function () {
        res.redirect('/home');
    }, function () {
        res.status(200).sendfile('dist/pages/login.html');
    });
//    res.status(200).sendfile('dist/pages/login.html');
});

app.get('/signup', function (req, res) {
    checkAuth(req.cookies.sid, function () {
        res.redirect('/home');
    }, function () {
        res.status(200).sendfile('dist/pages/signup.html');
    });
//    res.status(200).sendfile('dist/pages/signup.html');
});

app.get('/profile', function (req, res) {
    checkAuth(req.cookies.sid, function () {
        res.status(200).sendfile('dist/pages/profile.html');

    }, function () {
        res.redirect('/login');
    });

});

app.get('/home', function (req, res) {
    checkAuth(req.cookies.sid, function () {
        res.status(200).sendfile('dist/pages/home.html');

    }, function () {
        res.redirect('/login');
    });

});

app.get('/logout', function (req, res) {
    if (req.param.nojs === 'true') {
        res.clearCookie('sid').redirect('/');
    } else {
        res.clearCookie('sid').send('<!doctype html><html><head><script>localStorage[\'email\'] = null;localStorage[\'objectId\'] = null;localStorage[\'fullname\'] = null;localStorage[\'displayname\'] = null;localStorage[\'location\'] = null;localStorage[\'emailHash\'] = null;document.location = \'/\';</script></head><body>Wait...<noscript><meta http-equiv="refresh" content="0; url=/logout?nojs=true"></noscript></body></html>');
    }
});

require('http').createServer(app).listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});

function checkAuth(sid, callBack, errorCallBack) {
    if (sid === undefined) {
        errorCallBack();
    } else {
        request({
                url: 'https://api.parse.com/1/users/me',
                method: 'GET',
                headers: {
                    'X-Parse-Application-Id': 'i9zXXLCVxa2uoJSNLTMqCphcVE6TTbYg2Z0CUePB',
                    'X-Parse-REST-API-Key': '1vuZo4FGudiLWwgUCV9aAuBmI07kCrJfTmLHuxLz',
                    'X-Parse-Session-Token': sid
                }
            },
            function (error, response, body) {
                if (body.error === 'invalid session') {
                    errorCallBack();
                } else {
                    callBack();

                }
            });
    }
}
