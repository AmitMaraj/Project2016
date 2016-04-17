$(document).ready(function() {
	console.log('ready');
	// getAppointmentsWeek();
});

function getAppointmentsWeek(){
	$.get('/api/getAppointmentsWeek',function(dat,status){

		var t=$('#appointment').DataTable({
			"data":dat,
			"order":[[5,"asc"]],
			"bDestroy": true,
			"columns":[
				{data:"AppointmentID"},
				{data:"PatientID"},
				{data:"HospitalID"},
				{data:"DoctorID"},
				{data:"SurgeryID"},
				{data:"date"},
				{data:"details"}
			]
		});	
	});	
}

function getAppointments () {
	$.get('/api/getAppointments',function(dat,status){

		var t=$('#appointment').DataTable({
			"data":dat,
			"order":[[5,"asc"]],
			"bDestroy": true,
			"columns":[
				{data:"AppointmentID"},
				{data:"PatientID"},
				{data:"HospitalID"},
				{data:"DoctorID"},
				{data:"SurgeryID"},
				{data:"date"},
				{data:"details"}
			]
		});	
	});	 
}
