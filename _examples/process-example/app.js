var fs = require('fs');
console.log('------ base-app ------');
console.log('./app.js: ', fs.existsSync('./app.js'));
console.log('__dirname: ', __dirname);
console.log('process.cwd(): ', process.cwd());

require('./one/one.js');