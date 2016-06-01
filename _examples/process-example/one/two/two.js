var fs = require('fs');
console.log('------ mod-two ------');
console.log('./two.js: ', fs.existsSync('./two.js'));
console.log('__dirname: ', __dirname);
console.log('process.cwd(): ', process.cwd());