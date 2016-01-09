$(function() {
	//console.log('hello');
	//console.log(io);
	$('#dinput').hide();
	var socket = io.connect();
	var myname;
	

	$('#login').click(function () {
		socket.emit('searchname', $('#name').val());

		/*$('#dinput').show();
		$('#dname').hide();	
		$('#curuser').append($('#name').val());	*/
	});

	$('#button').click(function () {
		
		var message  = $('#input').val();
		var name = $('#name').val();
		//myname = name;
		var cdate = Date().toString().slice(4, 25)
		//console.log(message);
		$('#content').prepend('<p>' + name + ': ' + message + '  ' + cdate + '</p>');
		
			socket.emit('message', {
				name: name,
				message: message,
				date: cdate
			});	
		$('#input').val('');
		//console.log($('body').val());

	});

	socket.on('isExisted', function(data) {
		//console.log('boardcast: ' + data);
		if(data == 'No') {
			myname = $('#name').val();
			$('#dinput').show();
			$('#dname').hide();	
			$('#curuser').append($('#name').val());	
		}else {
			alert("This username had been used, please take another one.");
		}
		
	});

	

	socket.on('chatmsg', function(data) {
		//console.log('boardcast: ' + data);
		for(var i = 0; i < 10; i++)
		$('#content').append('<p>' + data[i].username + ': ' + data[i].msg + ' ' +data[i].time + '</p>');
	});
	
	//if($('#name').val() != null && $('#name').val() != 'undefined')
	socket.on('message', function(data) {
		//console.log('boardcast: ' + data);
		//$('#content').prepend('<p>' + $('#name').val() + ' </p>');
		if(myname != null)
		$('#content').prepend('<p>' + data.name + ': ' + data.message + ' ' + data.date + '</p>');
	});

	socket.on('online', function(name) {
		//console.log('boardcast: ' + data);
		if(myname != null)
		$('#content').prepend('<p>' + name + ' connected.</p>');
	});

	socket.on('offline', function(name) {
		//console.log('boardcast: ' + data);
		if(myname != null && name != null)
			$('#content').prepend('<p>' + name + ' disconnected.</p>');
	});
	
});
