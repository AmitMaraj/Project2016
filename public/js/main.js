$(document).ready(function() {
	console.log('ready');
	getAppointmentData();
});

function getAppointmentData(){
	$.get('/api/getAppointmentsWeek',function(dat,status){

		var t=$('#appointment').DataTable({
			"data":dat,
			"order":[[5,"asc"]],
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
