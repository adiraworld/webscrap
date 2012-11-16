
/*
 * GET home page.
 */
var harvester = require('../harvester/manofkorea');


exports.index = function(req, res){
	
	harvester.getWebData("http://www.manofkorea.com/");
	//harvester.getWebData("http://www.youtube.com/");
	//harvester.getWebData("http://www.ilbe.com/ilbe");		
	
	res.render('index', { title: 'Express' });
};