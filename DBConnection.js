var mysql = require("mysql"),
    connection;

// online database
var connection = mysql.createConnection({
	host: 'www.db4free.net',
	user: 'softenghospital',
	password: 'softenghospital',
	database: 'hospitaldb'
});


connection.connect(function (err) {
    if (err) {
        console.log("Error Connecting to the serverL: " + err.stack);
        return;
    }
    console.log("Successfully connected to the database");
});


function returnDBConnection() {
    return connection;
}


module.exports = {
    'returnDBConnection': returnDBConnection
}