
$(document).ready(function() {
	console.log('ready');

	// $('#calendar').fullCalendar({
 //        fixedWeekCount:false,
 //        weekNumbers:true,
 //        events: '/api/getAppointments'
 //    });
});

function tableInit(dat){
	var t=$('#appointment').DataTable({
		"data":dat,
		"order":[[5,"asc"]],
		"bDestroy": true,
		"columns":[
			{data:"AppointmentID"},
			{data:"PatientID"},
			{data:"firstname"},
			{data:"lastname"},
			{data:"HospitalID"},
			{data:"DoctorID"},
			{data:"SurgeryID"},
			{data:"date"},
			{data:"details"}
		]
	});	
}

function getAppointmentsWeek(){
	$.get('/api/getAppointmentsWeek',function(dat,status){
		if(dat)
			tableInit(dat);
		console.log(status);
	});	
}

function getAppointments () {
	$.get('/api/getAppointments',function(dat,status){
		if(dat)
			tableInit(dat);
		console.log(status);
	});	 
}
