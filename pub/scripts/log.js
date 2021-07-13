// JavaScript Document

var fromTime = (new Date()).getTime();

function logTime() {

	var toTime = (new Date()).getTime();
	if (window.console != undefined) {
		console.log( "[WINDOW.LOAD] " + ( toTime - fromTime ) );
	}
}

window.onload = logTime;




