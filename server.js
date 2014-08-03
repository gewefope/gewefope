var express = require('express')
    , request = require('request')
    , bodyParser = require('body-parser')
    , app = express()
    , cookieParser = require('cookie-parser')
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
    checkAuth(res, req.cookies.sid, function () {
        res.status(200).sendfile('dist/pages/index.html');
    });

//    if(req.cookies.sid === undefined) {
//        res.status(200).sendfile('dist/pages/index.html');
//    } else{
//        request({
//                url: 'https://api.parse.com/1/users/me',
//                method: 'GET',
//                headers: {
//                    'X-Parse-Application-Id': 'i9zXXLCVxa2uoJSNLTMqCphcVE6TTbYg2Z0CUePB',
//                    'X-Parse-REST-API-Key': '1vuZo4FGudiLWwgUCV9aAuBmI07kCrJfTmLHuxLz',
//                    'X-Parse-Session-Token': req.cookies.sid
//                }
//            },
//            function (error, response, body) {
//                if (body.error === 'invalid session') {
//                    res.status(200).sendfile('dist/pages/index.html');
//                } else {
//                    res.redirect('/home');
//                }
//            });
//    }
});

app.get('/login', function (req, res) {
    checkAuth(res, req.cookies.sid, function () {
        res.status(200).sendfile('dist/pages/login.html');
    });
//    res.status(200).sendfile('dist/pages/login.html');
});

app.get('/signup', function (req, res) {
    checkAuth(res, req.cookies.sid, function () {
        res.status(200).sendfile('dist/pages/signup.html');
    });
//    res.status(200).sendfile('dist/pages/signup.html');
});

app.get('/profile', function (req, res) {
    res.status(200).sendfile('dist/pages/profile.html');
});

app.get('/home', function (req, res) {
    res.status(200).send('dist/pages/profile.html');
});

app.get('/logout', function (req, res) {
    res.clearCookie('sid').send('<!doctype html><html><head><script>localStorage[\'email\'] = null;localStorage[\'objectId\'] = null;localStorage[\'fullname\'] = null;localStorage[\'displayname\'] = null;localStorage[\'location\'] = null;localStorage[\'emailHash\'] = null;document.location = \'/\';</script></head><body>Wait...</body></html>').redirect('/');

});

require('http').createServer(app).listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});

function checkAuth(res, sid, callBack) {
    if (sid === undefined) {
        callBack();
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
                    callBack();
                } else {
                    res.redirect('/home');
                }
            });
    }
}
