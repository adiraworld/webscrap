
/*
 * GET home page.
 */
var harvester = require('../harvester/manofkorea');


exports.index = function(req, res){
	
	harvester.getWebData("http://www.manofkorea.com/");	
	
	res.render('index', { title: 'Express' });
};