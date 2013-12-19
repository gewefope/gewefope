
app.get('/', function (req, res) {
    res.render('public/index.html');
});

app.get('/location', function (req, res) {
    res.render('public/location.html');
});

app.get('/city/:id', function (req, res) {
    res.render('public/city.html');
});

app.get('/search', function (req, res) {
    res.render('public/search.html');
});
