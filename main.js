var express = require('express'),
	bodyParser = require('body-parser'),
	mysql = require('mysql'),
	busboy = require('connect-busboy'),
	fs = require('fs'),
	CryptoJS = require('crypto-js'),
    app = express(),
    path = require('path');


// modules
var DBACCESS = require('./DBConnection');


app.set('port', process.env.PORT || 5000);

// static path to the public folder for client files to display
var serverPath = path.join(__dirname + '/public');
app.use(express.static(serverPath));


// parse application/json http body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(busboy());


// database connection setup

var connection = DBACCESS.returnDBConnection();
var SCHEDULING = require('./Functions/scheduling');
SCHEDULING.runSchedule();



// connect to database
connection.connect(function (err) {
	if (err) {
		console.error('error connecting to database: ' + err.stack);
		return;
	}

	console.log('Successfully connected to database as id ' + connection.threadId);
	SurgeryData();
});


// user request for homepage
app.get('/', function (req, res) {
    console.log("request for homepage received");
    res.sendFile(serverPath+'/login.html');
});


/*
	returns all appointments for the current week as a JSON Object.
*/
app.get('/api/getAppointmentsWeek', function (req, res) {
	// DATE_FORMAT(DATE_ADD(a.date,INTERVAL 2 HOUR),"%Y-%m-%dT%TZ") AS end 
	connection.query('SELECT CONCAT_WS(" ","Patient:",p.firstname, p.lastname,"\nDoctor ID:",a.DoctorID,"\nTime:",DATE_FORMAT(a.date,"%h:%i"),"\nDetails:",a.details) AS title, DATE_FORMAT(a.date, "%Y-%m-%dT%TZ") AS start FROM `appointment` AS a INNER JOIN `patientinfo` AS p ON a.PatientID=p.PatientID AND WEEKOFYEAR(date) = WEEKOFYEAR(NOW())', function (err, results) {
		if (err)
			console.log(err);
		else {
			// console.log(results);
			res.json(results);
		}
	});

});


/*
	returns all appointments from the database as a  JSON object.
*/
app.get('/api/getAppointments', function (req, res) {
	connection.query('SELECT CONCAT_WS(" ","Patient:",p.firstname, p.lastname,"\nDoctor ID:",a.DoctorID,"\nTime:",DATE_FORMAT(a.date,"%h:%i"),"\nDetails:",a.details) AS title, DATE_FORMAT(a.date, "%Y-%m-%dT%TZ") AS start FROM `appointment` AS a INNER JOIN `patientinfo` AS p ON a.PatientID=p.PatientID', function (err, results) {
		if (err)
			console.log(err);
		else {
			// console.log(results);
			res.json(results);
		}
	});

});


/*
	insert a surgery into the surgery table
*/
app.post('/api/scheduleSurgery', function (req, res) {

	connection.query('INSERT INTO `surgery` (`details`, `PatientID`, `DoctorID`, `RoomID`, `start`, `end`, `duration`, `priority`) VALUES (NULL,"' + req.body.choosePatient + '","' + req.body.chooseDoctor + '",(SELECT RoomID FROM `room` ORDER BY RAND() LIMIT 1) ,NULL,NULL,NULL,"' + req.body.priority + '")', function (err, results) {
		if (err) {
			console.log(err);
			res.send('0');
		}
		else {
			res.send('1');
		}
	});
	res.sendFile(serverPath+'/scheduleSurgery.html');
});



app.post('/api/getSurgeryRange', function (req, res) {

	connection.query('SELECT * FROM `temp` WHERE date BETWEEN DATE("' + req.body.start + '") AND DATE("' + req.body.end + '")', function (err, results) {
		if (err)
			console.log(err);
		else
			res.json(results);
	});

});

/*
	Gets surgeries from the surgery table 
*/
app.get('/api/getSurgery', function (req, res) {

	connection.query('SELECT CONCAT_WS(" ","Surgery ID:",s.SurgeryID,"\nRoom ID:",s.RoomID,"\nDoctor ID:",s.DoctorID,"\nPatient ID:",s.PatientID,"\nDetails:",s.details,"\nDuration",s.duration,"\nPriority",s.priority) AS title, DATE_FORMAT(s.date,"%Y-%m-%dT%TZ") AS start FROM `surgery` AS s WHERE date IS NOT NULL ORDER BY date ASC', function (err, results) {
		if (err)
			console.log(err);
		else{
			res.json(results);
		}
	});

});



/* checks to see if the patient already exist in database.
	returns 1 if exist else 0;
*/
app.post('/api/checkUser', function(req,res){
	console.log(req.body);
	var sql='SELECT `username`, `password` FROM `patientinfo` WHERE username="'+req.body.username+'" AND password="'+req.body.password+'" LIMIT 1';
	connection.query(sql,function(err,results){
		console.log(results);
		if (err||results.length==0) {
			res.redirect('back');	
		}
		if(results.length==1){
			console.log(results);
			res.sendFile(serverPath+'/makeAppointment.html');
		}
	});
	
});


app.post('/api/checkDoctor',function(req,res){

	var sql2='SELECT `DoctorID` FROM `doctor` WHERE username="'+req.body.username+'" AND password="'+req.body.password+'"' ; 

	connection.query(sql2,function(err,results){
		if(err||results.length==0){
			console.log(err);
		}
		if(results.length==1){
			res.sendFile(serverPath+'/appointment.html');
		}
	});
});


app.post('/api/makeAppointment',function(req,res){
	res.sendFile(serverPath+'/makeAppointment.html');
});




app.post('/api/user', function (req, res) {

	var fstream, user = {}, full, thumb;
	req.pipe(req.busboy);

	req.busboy.on('field', function (fieldname, val) {
		if (fieldname == 'fname')
			user.fname = val;
		else if (fieldname == 'lname')
			user.lname = val;
		else if (fieldname == 'age')
			user.age = val;
		else if (fieldname == 'sex')
			user.sex = val;
		else if (fieldname == 'username')
			user.username = val;
		else if (fieldname == 'password')
			user.password = val;
	});


	req.busboy.on('file', function (fieldname, file, filename) {
		console.log(user);
		if (filename != "") {
			console.log("Uploading: " + filename);

			if (user.fname != [] || user.lname != []) {
				full = __dirname + '/public/uploads/fullsize/' + filename;
				fstream = fs.createWriteStream(full);

				var sql = "INSERT INTO `patientinfo`(`img`, `lastname`, `firstname`, `age`, `sex`, `username`, `password`) VALUES ('" + filename + "','" + user.lname + "','" + user.fname + "','" + user.age + "','" + user.sex + "','" + user.username + "','" + user.password + "')";

				connection.query(sql, function (err, results) {
					if (err) {
						console.log("Error checking for user" + err);
						res.send('0');
						return;
					} else {
						console.log("data uploading");
						file.pipe(fstream);
						
						fstream.on('close',function(){
							res.redirect('/login.html');
						});
					}
				});
			} else{
				res.redirect('/user.html');
			}
		} else {
			console.log("picture isn't uploaded\n");
		}
	});
});





app.listen(app.get('port'), function () {
    console.log("Application Started on port: " + app.get('port') + "\n");
});


