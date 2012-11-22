/**
 * @author macmini
 * 
 * unzip issue : https://github.com/Woodya/node-gzbz2  로 다시 한번더 확인
 * 
 * 
 */

/*
var scraper = require('scraper');

exports.getWebData = function(url){
	var webData = new Array();
	
	console.log("call : %s",url);
	
	scraper(url, function(err, $) {
		if (err) {throw err;}
	
		console.log($('title').text());
	});
	
	
	return webData;
}
*/

var jsdom = require('jsdom');
var request = require('request');
var http = require('http');
var zlib = require('zlib');
var fs = require('fs');

exports.getWebData = function(url){
	var webData = new Array();
/*
	request({url: url
	  	, 'headers': {				
		'Accept-Encoding':'gzip,deflate,sdch',
		'Accept-Language':'ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4',
		'Cache-Control':'max-age=0',
		'Connection':'keep-alive',
		'Cookie':'PHPSESSID=7f9e11e268fbfce2477f094670922db2; wcs_bt=1353050895',
		'Host':'www.manofkorea.com',
		'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11'
		}
	}, function(err,response,body){
*/
	var request = http.get({ host: 'www.naver.com',
                         path: '/',
                         port: 80,
                         headers: { 'accept-encoding': 'gzip,deflate' } });	
                         
                         
	request.on('response', function(response) {

		var self = this;
		self.items = new Array();
		
		if(response.statusCode !== 200){
			console.log('Request error.');			
		}
		
		console.log(response.headers);
		
		var body = "";
		var output;
		
		
		switch (response.headers['content-encoding']) {
			case 'gzip':
				var gzip = zlib.createGunzip();
				response.pipe(gzip);	
				output = gzip;
				console.log("gzip");				
				break;
			case 'deflate':
				var inflate = zlib.createInflate();
				response.pipe(inflate);
				output = inflate;	
				console.log("deflate");		
				break;
			default:
		    	output = response;
		    	console.log("default");	
		    	break;
		}
		
		output.on('data', function (data) {
			data = data.toString('utf-8');
			body += data;
	    });
	
	    output.on('end', function() {
	    	console.log("end");
	        //return next(false, body);
	        fs.writeFile("me_index.html",body,"utf8",function(err){
	        	console.log("WRITE FILE ASYNC COMPLETE");
	        });
	    });

		
		/*
		switch (response.headers['content-encoding']) {
		    // or, just use zlib.createUnzip() to handle both cases
		    case 'gzip':	
		    	var gunzip = zlib.createGunzip();            
        		response.pipe(gunzip);
        		console.log("start");
        		gunzip.on('data', function(data) {
		            // decompression chunk ready, add it to the buffer
		            buffer.push(data.toString())
		            
		        }).on("end", function() {
		            // response and decompression complete, join the buffer and return
		            callback(null, buffer.join("")); 
		            console.log(buffer.toString());
		
		        }).on("error", function(e) {
		            //callback(e);
		            console.log(e);
		        })
		    
		    	zlib.gunzip(body, function(err, buffer){
		    		if (!err) {
					    console.log(buffer.toString());
					 } else {
					 	console.log(err);
					 }
		    		
		    	});
		    	
		   
		      break;
		    case 'deflate':
		      body.pipe(zlib.createInflate()).pipe(output);
		      break;
		    default:
		      body.pipe(output);
		      break;
		  }
		  
		  
		
		jsdom.env({
			html: body,
			scripts: ['http://code.jquery.com/jquery-1.6.min.js']
		}, function(err, window){
			var $ = window.jQuery;
			console.log($('title').text());
			//res.end($('title').text());
		});
		*/
		
	});
  
  console.log("call : harvester.getWebData(%s)",url);
  
  return webData;
};
