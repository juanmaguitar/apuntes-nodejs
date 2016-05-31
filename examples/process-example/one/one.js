var fs = require('fs');
console.log('------ mod-one ------');
console.log('./one.js: ', fs.existsSync('./one.js'));
console.log('__dirname: ', __dirname);
console.log('process.cwd(): ', process.cwd());

require('./two/two.js');