# [Stream](https://nodejs.org/api/stream.html) 

<sub>https://github.com/substack/stream-handbook</sub>

Los [*streams*](https://diigo.com/08mhfo) son objetos que te permiten leer o escribir datos de manera continua. En node.js tenemos 4 tipo de streams:

- **Readable** Para leer datos
- **Writable** Para escribir datos
- **Duplex** Para leer/escribir datos
- **Transform** Un tipo de duplex donde la salida de datos es procesada a partir de la entrada de datos

Cada tipo de stream es una instancia de `EventEmitter` y emite diferentes eventos en diferentes momentos del stream. Los más comunes son:

- `data` cuando los datos estan disponibles para ser leidos
- `end` cuando no hay más datos para leer
- `error` cuando se produce algun error al leer/escribir 
- `finish` 

## Lectura de streams

```javascript
var fs = require("fs");
var data = '';

// Create a readable stream
var readableStream = fs.createReadStream('input.txt');

// Set the encoding to be utf8. 
readableStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readableStream.on('data', function(chunk) {
   data += chunk;
});

readableStream.on('end',function(){
   console.log(data);
});

readableStream.on('error', function(err){
   console.log(err.stack);
});

console.log("Program Ended");
```

## Escritura de streams

```javascript
var fs = require("fs");
var data = 'Simply Easy Learning';

// Create a writable stream
var writableStream = fs.createWriteStream('output.txt');

// Write the data to stream with encoding to be utf8
writableStream.write(data,'UTF8');

// Mark the end of file
writableStream.end();

// Handle stream events --> finish, and error
writableStream.on('finish', function() {
    console.log("Write completed.");
});

writableStream.on('error', function(err){
   console.log(err.stack);
});

console.log("Program Ended");
```

## Chaining streams (`pipe`)

```javascript
var fs = require("fs");
var zlib = require('zlib');

// Compress the file input.txt to input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
  
console.log("File Compressed.");
```


## Popular streams

`res` is a _writable stream_

```javascript
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    var stream = fs.createReadStream(__dirname + '/data.txt');
    stream.pipe(res);
});
server.listen(8000);

```

Aqui `.pipe()` se encarga de escuchar a los eventos `data` y `end` de `fs.createReadStream()` y escribir el chunk (en cuanto es leido) en `res`

