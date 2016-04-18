
$(document).ready(function() {
	console.log('ready');

	$('#calendar').fullCalendar({ 
		events:{
			cache:true
		},
		
	});

});

function initCalendar (dat) {
	$("#calendar").fullCalendar('removeEvents');
	$("#calendar").fullCalendar('addEventSource', dat);
	$("#calendar").fullCalendar('rerenderEvents');
}

function getAppointmentsWeek(){
	
	$.get('/api/getAppointmentsWeek',function(dat,status){
		if(dat)
			initCalendar(dat);
		console.log(status);
	});	
}

function getAppointments () {

	$.get('/api/getAppointments',function(dat,status){
		if(dat)
			initCalendar(dat);
		console.log(status);
	});	 
}

function getSurgery () {
	  $.get('/api/getSurger',function(dat,status){
		if(dat)
			tableInit(dat);
		console.log(status);
	});	 
}

