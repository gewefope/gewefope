module.exports = function (app) {

    app.get('/weather/city/:id', function (req, res) {
        res.sendfile('client/pages/weather/city/city.html');
    });

    app.get('/storage/js/runtime.min.js', function (req, res) {
        res.sendfile('client/storage/js/runtime.min.js');
    });

    app.get('/storage/js/global.js', function (req, res) {
        res.sendfile('client/storage/js/global.js');
    });

    app.get('/', function (req, res) {
        res.sendfile('client/pages/index/index.html');
    });

    app.get('/storage/_/js/index.js', function (req, res) {
        res.sendfile('client/pages/index/index.js');
    });

    app.get('/storage/_/js/city.js', function (req, res) {
        res.sendfile('client/pages/weather/city/city.js');
    });

    app.get('/storage/_/js/index.template.js', function (req, res) {
        res.sendfile('client/pages/index/index.template.js');
    });

    app.get('/storage/_/js/city.template.js', function (req, res) {
        res.sendfile('client/pages/weather/city/city.template.js');
    });

    app.get('/storage/css/global.css', function (req, res) {
        res.sendfile('client/storage/css/global.css');
    });

}