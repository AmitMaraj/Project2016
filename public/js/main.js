
$(document).ready(function() {
	console.log('ready');

	$('#calendar').fullCalendar({ 
		header: {
             left: 'prev,next today',
             center: 'title',
             right: ' '
        },
        eventColor:'#1E90FF',
		defaultView:'month',
		events:{
			cache:true
		},
    	dayClick:function(date, jsEvent, view) {
    		if(view.name==='basicDay')
    			$('#calendar').fullCalendar('changeView','month');
    		else{
    			$('#calendar').fullCalendar('changeView','basicDay');
        		$('#calendar').fullCalendar('gotoDate',date);
    		}
    	}
	});

});

function initCalendar (dat) {
	$("#calendar").fullCalendar('removeEvents');
	$("#calendar").fullCalendar('addEventSource', dat);
	$("#calendar").fullCalendar('rerenderEvents');
}

function getAppointmentsWeek(){
	
	$.get('/api/getAppointmentsWeek',function(dat,status){
		if(dat){
			initCalendar(dat);
			$('#calendar').fullCalendar('changeView','basicWeek');
			$('#calendar').fullCalendar('today');
		}
		console.log(status);
	});	
}

function getAppointments () {

	$.get('/api/getAppointments',function(dat,status){
		if(dat){
			initCalendar(dat);
			$('#calendar').fullCalendar('changeView','month');
		}
		console.log(status);
	});	 
}

function postSurgery () {
	 $('#surgeryForm').submit(function(){
	 	$('#surgeryForm').trigger('reset');	
	 });
}
