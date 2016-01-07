$(function() {
	//console.log('hello');
	//console.log(io);
	$('#dinput').hide();
	var socket = io.connect();

	

	$('#login').click(function () {
		$('#dinput').show();
		$('#dname').hide();	
		$('#curuser').append($('#name').val());	
	});


	$('#button').click(function () {
		
		var message  = $('#input').val();
		var name = $('#name').val();
		//console.log(message);
		$('#content').prepend('<p>' + name + ': ' + message + '</p>');
		
			socket.emit('message', {
				name: name,
				message: message 
			});	
		$('#input').val('');
		//console.log($('body').val());

	});

	
	
	socket.on('message', function(data) {
		//console.log('boardcast: ' + data);
		$('#content').prepend('<p>' + data.name + ': ' + data.message + '</p>');
	});

	socket.on('online', function(name) {
		//console.log('boardcast: ' + data);
		//$('#content').prepend('<p>' + 'Someone' + ' connected.</p>');
	});

	socket.on('offline', function(name) {
		//console.log('boardcast: ' + data);
		if(null != name)
		$('#content').prepend('<p>' + name + ' disconnected.</p>');
	});
	
});
