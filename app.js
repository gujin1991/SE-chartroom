var express = require('express');
var http = require('http');
var path = require('path');
var io = require('socket.io');
var mongo = require('mongodb');
var host = "localhost";
var dbport = 27017;
var dbserver = new mongo.Server(host,dbport,{auto_reconnect:true});
var db = new mongo.Db("chatroom",dbserver,{safe:true});
var curUser = new Array();

var app = express();
//app.set('port', process.env.PORT || 3000); 
app.use(express.static(path.join(__dirname, './public')));

var server = http.createServer(app);
io = io.listen(server);

server.listen(4000);
console.log("The server is listening on 127.0.0.1:4000.");


io.sockets.on('connection', function (socket) {
	    var name;
    var userNum;
    
		

    socket.on('message', function(data) {
    	
    	//console.log(curUser);
    	
		db.open(function (err,db) {//连接数据库
		     if(err)
		         throw err;
		     else{
		     	//console.log(Date().toString().slice(4, 25));
		         db.collection("chatmessage", function (err,collection) {

		            collection.insert({username:name,msg:data.message,time:data.date}, function (err,docs) {
		                 //console.log(docs);
		                db.close();
		            });
		         });        
		     }
		 });
		
		socket.broadcast.emit('message',data);
	});

	socket.on('disconnect', function() {
		userNum = curUser.length - 1;	
		socket.broadcast.emit('offline', {
				name: name,
				num: userNum
		});
		curUser.splice(curUser.indexOf(name), 1);
		
	});

	socket.on('searchname', function(data) {
		//console.log(curUser);
		if(curUser.indexOf(data) == -1) {
			name = data;
			curUser.push(data);
			userNum = curUser.length;
			socket.emit('isExisted', {
				sign: 'No',
				num: userNum
			});
				
			socket.broadcast.emit('online', {
				name: name,
				num: userNum
			});
				
			db.open(function (err,db) {
			    db.collection("chatmessage", function (err,collection) {
			        if(err) throw err;
			        else{
			            collection.find().sort({ _id : -1 }).limit(10).toArray(function(err,docs){
			                if(err) throw  err;
			                else{
			                    //console.log(docs);
			                    socket.emit('chatmsg', docs);	
			                    db.close();
			                }
			            });
			        }
			    });
			});


		} else {
			socket.emit('isExisted', 'Yes');

		}
		
	});



	
	
	

});




