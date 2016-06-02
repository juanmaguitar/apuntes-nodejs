# Intro Streams

En aplicaciones que dependen mucho del acceso a la red y accesos a archivos en el disco es muy importante la manera en la que se envia y recibe la info

Para mejorar la eficiencia, sobre todo con grandes cantidades de datos, se hace necesario el envio/lectura de los datos por trozos (_chunks_)

Los streams son como tuberias donde la información fluye

```javascript
    var http = require('http');

                 /* readable stream ⬇ */   
    http.createServer( function ( request , response){ 
                                            /*  ⬆ writable stream */
      response.writeHead(200);
      response.write("Hello, this is dog.\n");
      setTimeout(function(){ 
        response.write("Dog is done.\n");
        response.end();
      }, 5000);
    }).listen(8080);
```

El evento `request` es un readable stream que emite los eventos:
    - `readable` cuando los datos estan listos para ser _consumidos_
    - `end` cuando el cliente ha terminado de enviar los datos

```javascript
http.createServer(function(request, response) {
    response.writeHead(200);
    request.on('readable', function() {
        var chunk = null;
        while (null !== (chunk = request.read())) {
            console.log(chunk.toString());
        }
    });
    request.on('end', function() {
        response.end();
    });
}).listen(8080)
```


### Subir archivos al servidor

```javascript
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
    var newFile = fs.createWriteStream('upload_copy.md');
    request.pipe(newFile);
    request.on('end', function(){
      response.end("uploaded!");
    });
  })
  .listen(8080);
```

```bash
curl --upload-file readme.md http://localhost:8080ç
```

Debido a las caracteristicas de node y de streams la subida de archivos con node 

- el archivo no se almacena en memoria sino que se va escribiendo en disco a medida que va llegando
- como node es no-blocking, podemos subir varios archivos a la vez


