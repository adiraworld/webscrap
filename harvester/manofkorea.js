/**
 * @author macmini
 */
var jsdom = require('jsdom');
var request = require('request');

exports.getWebData = function(url){
  var webData = new Array();
  
  request({url: url}, function(err,response,body){
		var self = this;
		self.items = new Array();
		
		if(err & response.statusCode !== 200){
			console.log('Request error.');			
		}
		
		console.log(response);
		
		jsdom.env({
			html: body,
			scripts: ['http://code.jquery.com/jquery-1.6.min.js']
		}, function(err, window){
			var $ = window.jQuery;
			console.log($('title').text());
			res.end($('title').text());
		});
	});
  
  console.log("call : harvester.getWebData(%s)",url);
  
  return webData;
};
