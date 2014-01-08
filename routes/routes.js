module.exports = function(app){

// Have grace under load
/*app.use(function(req, res, next) {
  if (toobusy()) {
    res.send(503, "I'm busy right now, sorry.");
  } else {
    next();
  }
});*/

    app.get('/', function(req, res){
        res.render('index/index.jade', {
            title: 'Gewefope home page',
            description: 'The home page of Gewefope project'
        });
    });

    app.get('/location', function(req, res){
        res.render('weather/location.jade', {
            title: 'Gewefope weather',
            description: 'The home page of Gewefope project'
        });
    });

    //legals

    
    //other routes..


    //Errors
    // Handle 404
    app.use(function(req, res) {
      res.status(404);
      res.render('errors/404.jade', {title: '404 Not Found', errorname: '404'});
    });
  
    // Handle 500
    app.use(function(error, req, res, next) {
      res.status(500);
      res.render('errors/500.jade', {title:'500 Internal Server Error', error: error, errorname: '500'});
    });
}
