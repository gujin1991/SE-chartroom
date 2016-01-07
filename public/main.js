$(function() {
	//console.log('hello');
	//console.log(io);

	var socket = io.connect();
	$('#button').click(function () {
		
		var message  = $('#input').val();
		var name = $('#name').val();
		//console.log(message);
		$('body').append('<p>' + name + ': ' + message + '</p>');
		
			socket.emit('message', {
				name: name,
				message: message 
			});	
		
		

	});

	
	
	socket.on('message', function(data) {
		//console.log('boardcast: ' + data);
		$('body').append('<p>' + data.name + ': ' + data.message + '</p>');
	});

	socket.on('online', function(name) {
		//console.log('boardcast: ' + data);
		$('body').append('<p>' + name + ' connected.</p>');
	});

	socket.on('offline', function(name) {
		//console.log('boardcast: ' + data);
		$('body').append('<p>' + name + ' disconnected.</p>');
	});
	
});
