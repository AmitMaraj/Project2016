$(document).ready(function() {
	console.log("ready");
	$('#invalid').hide();
});
function checkUser () {
		console.log("check user");
	 	$.post('/api/checkUser', function(data, textStatus, xhr) {
	 		console.log(data);
	 		if(data==='1')
	 			window.location.href('makeAppointment.html');
	 		else{
	 			$('#login').trigger('reset');
	 			$('#invalid').append('<div class="alert alert-danger" role="alert">Invalid Username or Password</div>');
	 			$('#invalid').show();
	 		}
	 	});
	}
