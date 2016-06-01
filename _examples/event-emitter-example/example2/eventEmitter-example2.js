var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var fs = require('fs');

var c = require('./colorCodesConsole.js');

//https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script

var cInfo = c.bgblue + '%s' + c.reset;
var cImportant = c.bgyellow + '%s' + c.reset;
var cOk = c.bggreen + '%s' + c.reset;
var cError = c.bgred + '%s' + c.reset;

emitter.on('readFile',function(file_name){

	console.log(cInfo, "Started Reading file....");

	fs.readFile(file_name, 'utf8', function (err,data) {
		if (err) {
			emitter.emit('error','from_read');
		}
		else{
			console.log(cImportant, "Done Reading file....");
			emitter.emit('showFile',data);
		}
	});

});

emitter.on('showFile',function(data){
	console.log(cOk, "Showing content of file....");
	console.log(data);
	emitter.emit('done');
});

emitter.on('error',function(type){
	console.log(cError, "Faced error while "+type);
	emitter.emit('done');
});

emitter.on('done',function(){
	console.log(cInfo, "Ok its done !");
});

emitter.emit('readFile','./text.txt');

