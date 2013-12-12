
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('dist/index.html/index.js', { title: 'Express' });
};