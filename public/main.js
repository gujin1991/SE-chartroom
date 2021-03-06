$(function() {
	$('#dinput').hide();
	$('#content').hide();
	var socket = io.connect();
	var myname;
	

	$('#login').click(function () {
		socket.emit('searchname', $('#name').val());
	});

	$('#button').click(function () {
		
		var message  = $('#input').val();
		var cdate = Date().toString().slice(4, 25)
		//console.log(message);
		//$('#content').prepend('<p style=\'background-color:honeydew;font-size:large;text-align:right;border:3px solid #000;word-wrap:break-word;word-break:break-all;overflow: auto;width:750px; height:60px;margin-left: auto; margin-right: auto\'>'+ message + '</p>');
		$('#content').prepend('<p class="bg-primary mymsg">' + message + '</p>');
		$('#content').prepend('<p class="mydate" style=\'text-align:right\'>' + cdate + '</p>');


			socket.emit('message', {
				name: myname,
				message: message,
				date: cdate
			});	
		$('#input').val('');
		//console.log($('body').val());

	});

	socket.on('isExisted', function(data) {
		//console.log('boardcast: ' + data);
		if(data.sign == 'No') {
			myname = $('#name').val();
			$('#name').val('');
			$('#dinput').show();
			$('#content').show();
			$('#dname').hide();	
			$('#curuser').append(myname);
			$('#userNum').append(data.num);		
		}else {
			alert("This username had been used, please take another one.");
		}
		
	});

	

	socket.on('chatmsg', function(data) {
		//console.log('boardcast: ' + data);
		for(var i = 0; i < 10; i++) {
			if(data[i].username == myname) {
				$('#content').append('<p style=\'text-align:right\' class="mydate">' + data[i].time + '</p>');
				$('#content').append('<p class="bg-primary mymsg">' + data[i].msg + '</p>');	
			} else {
				$('#content').append('<p style=\'text-align:left\' class="mydate">' + data[i].time + '</p>');
				$('#content').append('<p class="bg-success othermsg">' + data[i].username + ': ' + data[i].msg + '</p>');	
			}
							
		}
		
	});
	
	socket.on('message', function(data) {
		if(myname != null) {
			$('#content').prepend('<p class="bg-success othermsg">' + data.name + ': ' + data.message + '</p>');	
			$('#content').prepend('<p style=\'text-align:left\' class="mydate">' + data.date + '</p>');

		}
		
	});

	socket.on('online', function(data) {
		//console.log('boardcast: ' + data);
		if(myname != null) {
			$('#userNum').replaceWith("<p id = \'userNum\'>Online user number:" + data.num + "</p>");
			$('#content').prepend('<p style=\'text-align:center\'>' + data.name + ' connected.</p>');

		}
	});

	socket.on('offline', function(data) {
		//console.log('boardcast: ' + data);
		if(myname != null && name != null) {
			$('#userNum').replaceWith("<p id = \'userNum\'>Online user number:" + data.num + "</p>");
			$('#content').prepend('<p style=\'text-align:center\'>' + data.name + ' disconnected.</p>');	
		}
			
	});
	
});
