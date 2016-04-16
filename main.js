var express = require('express'),
	bodyParser = require('body-parser'),
	mysql = require('mysql'),
    app = express();

app.set('port', process.env.PORT || 8000);

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
  host     : 'www.db4free.net',
  user     : 'softenghospital',
  password : 'softenghospital',
  database : 'hospitaldb'
});


// connect to database
connection.connect(function(err) {
  if (err) {
    console.error('error connecting to database: ' + err.stack);
    return;
  }
 
  console.log('connected to database as id ' + connection.threadId);
  getAppointments();
});

function getAppointments(){
	connection.query('SELECT * FROM `appointment`',function(err,results){
		console.log(results);
	});
}

app.listen(app.get('port'), function () {
    console.log("Application Started on port: " + app.get('port') + "\n");
});
