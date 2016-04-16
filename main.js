var express = require('express'),
	bodyParser = require('body-parser'),
	mysql = require('mysql'),
    app = express();

app.set('port', process.env.PORT || 5000);

// static path to the public folder for client files to display
var serverPath = __dirname + '/public/';
app.use(express.static(serverPath));

// parse application/json http body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// database connection setup
var connection = mysql.createConnection({

});


// connect to database
connection.connect(function(err) {
  if (err) {
    console.error('error connecting to database: ' + err.stack);
    return;
  }
 
  console.log('Successfully connected to database as id ' + connection.threadId);
});


app.get('/', function (req, res) {
    console.log("request for homepage received\n\nredirect to index.html\n");
    res.sendFile(serverPath + 'index.html');
});


/*
	returns all appointments for the current week as a JSON Object.
*/
app.get('/api/getAppointmentsWeek', function(req,res){

	connection.query('SELECT * FROM `appointment` WHERE WEEKOFYEAR(date) = WEEKOFYEAR(NOW())',function(err,results){
		res.json(results);
	});

});


/*
	returns all appointments from the database as a  JSON object.
*/
app.get('/api/getAppointments', function(req,res){

	connection.query('SELECT * FROM `appointment`',function(err,results){
		res.json(results);
	});

});


/* checks to see if the patient already exist in database.
	returns 1 if exist else 0;
*/
app.post('/api/checkUser', function(req,res){

	var sql='SELECT `lastname`, `firstname` FROM `patientinfo` WHERE `lastname`="'+req.body.lastname+'" AND `firstname`="'+req.body.firstname+'"';

	connection.query(sql,function(err,rows){
		if (err) {
			console.log("Error checking for user"+ err);
		}
		else if(rows.length == 1){
			console.log(rows);
			res.send('1');
		}
		else
			res.send('0');
		
	});
});

app.listen(app.get('port'), function () {
    console.log("Application Started on port: " + app.get('port') + "\n");
});
