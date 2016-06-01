var EventEmitter = require('events').EventEmitter;
var radium = new EventEmitter();

radium.on('radiation', function(ray) {
    console.log(ray);
});

setInterval(function() {
    radium.emit('radiation', 'GAMMA');
}, 1000);