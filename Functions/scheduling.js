var PriorityQueue = require('priorityqueuejs');
var queue = new PriorityQueue(function (a, b) {
	return a.priority - b.priority;
});

// hospital variables
var CLOSING_TIME = 20,
	OPENING_TIME = 8;

var startTime = OPENING_TIME;


var d = new Date();
var m = d.getMonth() + 1;
var start = d.getFullYear() + "-" + m + "-" + d.getDate();



var DBACCESS = require('.././DBConnection');
var connection = DBACCESS.returnDBConnection();
console.log("running sch");

var data = {};
var beginDate = start;
function SurgeryData() {
	connection.query('SELECT * FROM `temp` WHERE date BETWEEN DATE("' + prevDays(start, 3) + '") AND DATE("' + addDays(start, 1) + '")', function (err, results) {
		if (err)
			return err;
		else {

			forEach(results, function (row) {
				queue.enq(row);
				console.log(row);
			});

			while (queue.size() > 0) {
				var make = queue.deq();
				make.sch = addhours(beginDate, startTime);
				make.duration = (make.duration * 60) * 60;

				var time = "SEC_TO_TIME(" + make.duration + ")";
				var sql = 'INSERT INTO `surgery` (`details`, `PatientID`, `DoctorID`, `RoomID`, `date`, `duration`, `priority`) VALUES ("' + make.details + '","' + make.PatientID + '","' + make.DoctorID + '",(SELECT RoomID FROM `room` ORDER BY RAND() LIMIT 1) ,"' + make.sch + '",' + time + ',"' + make.priority + '")';

				connection.query(sql, function (err, results) {
					if (err) {
						console.log(err);
					}
					else {
						console.log("Inserted");
						var del = "DELETE FROM `temp` WHERE `PatientID` = '" + make.PatientID + "' AND  `DoctorID` = '" + make.DoctorID + "';";
						connection.query(del, function (err, results) {
							if (err) {
								console.log(err);
							}
							else {
								console.log("DELETED")
							}
						});
					}
				});

				startTime += make.duration;
			}
		}
	});
}




function forEach(arr, operation) {
    for (var i = 0; i < arr.length; i += 1) {
        operation(arr[i]);
    }
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return endDate(result);
}


function prevDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return endDate(result);
}

function addhours(date, hours) {
    var result = new Date(date);
    result.setDate(result.getHours() + hours);
	var newhour = result.getHours() + hours;
    return schDate(date, newhour);
}


function schDate(date, newhour) {
	var date = new Date(date);
	if (startTime > CLOSING_TIME) {
		startTime = OPENING_TIME;
		beginDate = addDays(beginDate, 1);
		date.setDate(date.getDate() + 1);
		newhour = startTime;
	}
	var newdate = addDays(date, 1);
	return (newdate + "-" + newhour % 24);
}



function endDate(date) {
	var m = date.getMonth() + 1;
	return (date.getFullYear() + "-" + m + "-" + date.getDate());
}







function runSchedule() {
    SurgeryData();
}


module.exports = {
    'runSchedule': runSchedule
}