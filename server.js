var express = require('express');
var bodyparser = require('body-parser');
var session = require('express-session');

var app = express();
app.use(bodyparser.json());


global.jsonstring ="test";
global.author="a";
global.post="p";
global.AuthorName = " ";
global.coklist = {};

app.get('/', function(req, res){
	res.send('Hello World - Darshana')
})

app.get('/authors', function(req, res)
{
	console.log("in authors")
	var https = require('https');
	 
	var options = {
		host: "jsonplaceholder.typicode.com",
		path: "/users",
		method: "GET"
	};
	//global.jsonstring =" ";
       function makecall(options, callback) {	
                https.get(options, function(res){
		var body = '';
		res.on('data',function(chunk){
			body += chunk;
		});
		res.on('end', function(){
			if (res.statusCode === 200){
			try {
				var authors = JSON.parse(body);
			//	console.log(authors);
				global.author = JSON.stringify(authors);
				console.log('status code:', res.statusCode);
				callback(authors);
			} catch (e){
				console.log('Error parsing JSON');
			}
			} else {
				console.log('status:', res.statusCode);
			}

		});

	}) .on('error', function (err){
			console.log('Error' , err);
	});
       }
//request.end();
//console.log("outside httpget");
res.send("chk console "+ global.author  );
//res.end();
	makecall(options, function(results){
		console.log ("authors:", results); 
		//res.status(200).send("res authors:", results);
	})
});



app.get('/posts', function(req,res){
	console.log("in posts");
	var https = require('https');
	var options  = {
		host: "jsonplaceholder.typicode.com",
		path: "/posts",
		method: "GET"
	};

	console.log("b4 http get");
	https.get(options, function(res){
		var body = '';
		res.on('data', function(chunk){
			body += chunk;
		});
		res.on('end', function(){
			if (res.statusCode === 200){
			   try {
				   var posts = JSON.parse(body);
				   console.log(posts);
				   global.post = JSON.stringify(posts);
			   } catch (e){
				   console.log('Error parsing JSON');
			   }
			} else {
				console.log('status:', res.statusCode);
			}
		});
	}) .on('error', function(err){
		console.log('Error' , err);
	});
	console.log("outside http get for  post");
	res.send(post);
});
		
app.get('/postcnt', function(req,res){
//	console.log("in posts");
	var https = require('https');
	var options  = {
		host: "jsonplaceholder.typicode.com",
		path: "/posts",
		method: "GET"
	};
       // global.jsonstring = "post cnt ";
//	console.log("b4 http get");
	https.get(options, function(res){
		var body = '';
		var txt = " " ;
	
		res.on('data', function(chunk){
			body += chunk;
		});
		res.on('end', function(){
			if (res.statusCode === 200){
			   try {
				   var posts = JSON.parse(body);
				   var cnt = 0;
				   var CurrUserId = ""
				   var PrevUserId = ""
				   for (var myKey in posts){
					   { 
					    //console.log('mkey:', myKey);
					     if (cnt === 0) 
					     //if (myKey === 0)
						{
						   
						    PrevUserId = posts[myKey].userId;
						    cnt = cnt +1;
					    } 
					     else 
						   {
  						    //console.log("value of cnt else", cnt);
						    
						    //console.log ('b4 if currusr id ', CurrUserId);
					            if (myKey > 1 )
							   {cnt = cnt + 1;
							   }
						    CurrUserId = posts[myKey].userId;	   
				             	    if (PrevUserId != CurrUserId)
						   { 
	             				     //console.log("AUthor Id: ", PrevUserId, " cnt: " , cnt   );
						     if (myKey > 1)
   						  	 { //var tstfunc = calltest(PrevUserId);
						           global.jsonstring = global.jsonstring + '<br>' +  "AUthor Id: "+ PrevUserId+ AuthorName + " cnt: " + cnt //+ " func " + tstfunc
							   GetAuthorName(PrevUserId, function(Authorname) {
									global.jsonstring = txt + ' Author : ' + Authorname;
							   });
							   //console.log("returned each", global.Authorname);	 
						   	   //txt = txt + '<br>' +  "AUthor Id: "+ PrevUserId+ AuthorName + " cnt: " + cnt //+ " func " + tstfunc
						           console.log("txt:", global.jsonstring);
                                                         }
						     PrevUserId = posts[myKey].userId;
   					     	     cnt = 0;
						   }
						   else
							   { //console.log('in else');
							   }
						   }
					   }
					   }
					    cnt = cnt +1 ;
				   	    var name = GetAuthorName(PrevUserId);
						    //console.log('returned last :' , name);
						    global.jsonstring = global.jsonstring + "<br>" + "AUthor Id: "+ PrevUserId+ " " + name + " cnt: " + cnt;
        	                                    console.log("txt:" , global.jsonstring  );
					   	    //global.jsonstring = txt;
					    
			      
			   } catch (e){
				   console.log('Error parsing JSON');
			   }
			} else {
				console.log('status:', res.statusCode);
			}
		});
	}) .on('error', function(err){
		console.log('Error' , err);

	});
//	console.log("outside http get for  post");
	res.send(jsonstring);
});



function GetAuthorName(UsrId){

	var fetch = require('node-fetch');

	var url = 'https://jsonplaceholder.typicode.com/users/'+ UsrId;
	console.log('in getauthor url', url);

	const getData = async url =>{
		try {
			const response = await fetch(url);
			//console.log('responce' , response);
			const json = await response.json();
			//console.log('json', json);
			var txt = json.name;
			console.log(' name: ', txt);
			return(txt);

		} catch (error){
			console.log(error);
		}
	};
	getData(url, function(results){
		console.log('return', results);
		return results;
	});
      //return jsonstring	
};

app.get('/setcookie', function(req,res){

//	req.session.name = 'darshana'
//	req.session.age = '30';
	res.cookie('name','darshana',{expires: new Date(Date.now() + 900000), httponly: true})
	res.cookie('age','40',{expires: new Date(Date.now() + 900000), httponly: true})
	res.send('cookie set successfully');
});

app.get('/getcookie', function(req,res){
	var http = require('http');
	var options = {
		host: "localhost",
		path: "/setcookie",
		port: 8080,
		method:'GET'
	}
	var resstr = "";

	var request = http.request(options, function(response){
		var setcookie = response.headers['set-cookie'];
		//console.log("setcook:", setcookie);
		if (setcookie){
			setcookie.forEach(
				function (cookiestr){
					//console.log("cookie:" +cookiestr);
					resstr = cookiestr.split("=");
					global.coklist[resstr.shift().trim()]= decodeURI(resstr.join('='));
					//console.log("split", resstr);
					console.log("cookie list", global.coklist);
					
				}
			);
		}

		var data = "";
		response.on("data", function(chunk){
			data += chunk;}
		);

		response.on("end", function(){
			//console.log("status:" + response.statuscode);
			//console.log("data" + data);
			return(global.coklist);
		}
		);
	}
	);
	request.on("error", function(err){
		console.log("err:" + err);
	}
	);
	res.send(global.coklist);
	request.end();

	});


app.get('/robot.html', function(req, res){
    res.redirect("http://httpbin.org/deny");
});

app.get('/image1', function(req,res){

var fs = require('fs');
var url = require('url');
var http = require('http');


	
	//console.log(img);
	
	fs.readFile('img1.jpg',  function(error, data){
		if (error){
			res.writeHead(404);
			response.write('File not found');
		}
		else {
			http.createServer(function (req,res){
			res.writeHead(200, {'Content-Type': 'image/jpeg' });
			console.log('file written');
			res.end(data);
			});
		}
		
		
	//res.end(img, 'binary');
		console.log('in progress');


});
});

app.get('/image', function(req, res){

	var fs = require('fs');
	var url = require('url');
	var http = require('http');

	fs.readFile('img1.jpg',  function(error, data){
	if (error){
		res.writeHead(404);
		response.write('File not found');
	}
	else {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<html><body><img src="data:image/jpeg;base64,')
		res.write(Buffer.from(data).toString('base64'));
		res.end('"/></body></html>');
	};
	});
});


var http = require("http");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });


app.get('/input', function(req,res){

	var txtHtml = `
	<body>
	<form action='/subinp' method='post' name='form1'>
	<input type = "text" name="InpTxt" />
	<br/>
	<input type = "submit" id="submit" value="Submit" />
	</form>
	</body>`;
	res.send(txtHtml);

});

app.post('/subinp', urlencodedParser, function(req,res){
	var reply = " ";
	reply += "Your Input is : " + ' '+ req.body.InpTxt;
	console.log(reply);
	res.send(reply);
	

});



function calltest(passed){
	var comments = "in  calltest id:" + passed
	comments += comments+"ret"
	return comments
}


// new code
//var cookieParser = require('cookie-parser');
//app.use(cookieParser());

//app.get('/getcookie', function(req,res){
//     console.log(req.cookies);
//     //var txt = cookieParser.JSONCookies(req.cookies);
//     //console.log("txt",txt);
//     //for (var i in txt) {
//      //   var cok = txt[i].name;
//	 // console.log("ck", cok);
//     //}     
//	//console.log( "brk", txt[1].JSONCookie);
//
//	     //var txt = cookieParser.JSONCookies(req.cookies);
//     //console.log("txt",txt);
//     for (var i in cookieParser.JSONCookies(req.cookies)) {
//          var cok = cookieParser.JSONCookies(req.cookies)[i].JSONcookie;
//	  console.log("ck", cok);
//     }     
//	//console.log( "brk", txt[1].JSONCookie);

//});
//


//app.get('/getcookie', function(req,res){

//	var http = require(http);
//	var list{}, 
//	    rc request.headers.cookie;
	
//	rc = rc.split(':').forEach(function(cookie){
//		var parts = cookie.split(';');
//		list[parts.shift().trim] = decodeURI(parts.join(';'));
//	});
//}


app.listen(8080)
