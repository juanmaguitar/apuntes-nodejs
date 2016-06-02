# Ideas Claras sobre node.js

- Nos permite crear aplicaciones de red escalables en el servidor utilizando Javascript
- Utiliza el motor _V8 Javascript Runtime_ (que es el mismo que corre en Google Chrome)
- Node.js añade funcionalidades (por encima de este engine) para crear aplicaciones en el servidor
- Está escrito en C (lo que lo hace muy rapido)
- Node funciona especialmente bien en apps tipo: Servidores de chat (Websocket), Aplicaciones de subidas de ficheros, Servidores de anuncios, Aplicaciones con datos en tiempo real


Blocking code

    Read file from Filesystem, set equal to “contents”
    Print contents
    Do something else


Non-Blocking Code

    Read file from Filesystem
        whenever you’re complete, print the contents <-- callback
    Do Something else


Blocking code

    var contents = fs.readFileSync('/etc/hosts');
    console.log(contents);
    console.log('Doing something else');

Non-Blocking Code

    fs.readFile('/etc/hosts', function(err, contents) {
        console.log(contents);
    });
    console.log('Doing something else';


    var callback = function(err, contents) {
        console.log(contents);
    }
    fs.readFile('/etc/hosts', callback);
    fs.readFile('/etc/inetcfg', callback);

```javascript

var http = require('http'); // how modules are required

http.createServer(function(request, response) {

    response.writeHead(200); // status code in header
    response.write("Hello, this is dog."); // response body
    response.end(); // close the connection

}).listen(8080, function(){ // listen for connections on this port

    console.log('Listening on port 8080...');

});
```

    $ node hello.js
    Listening on port 8080...

    $ curl http://localhost:8080
    Hello, this is dog.

Registramos el evento `request` y lanzamos un event loop que chequea todo el tiempo la existencia de eventos (¿Hay alguna request? ¿Hay alguna request? ¿Hay alguna request? )
Cuando se produce una petición se lanza el evento `request` y a su vez se ejecuta la función _callback_ registrada para este evento

The Event Loop

Los eventos son detectados por node y son añadidos a la _Event Queue_ donde seran ejecutados en orden de llegada

https://nodesource.com/blog/understanding-the-nodejs-event-loop/
https://nodejs.org/en/about/
http://abdelraoof.com/blog/2015/10/28/understanding-nodejs-event-loop/
http://www.tutorialspoint.com/nodejs/nodejs_event_loop.htm
http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/
https://codeforgeek.com/2015/08/nodejs-event-loop-works/

** https://www.toptal.com/nodejs/top-10-common-nodejs-developer-mistakes


```javascript
    var http = require('http');
    var server = http.createServer();

    function callback(request, response){
      response.writeHead(200);
      response.write("Hello, this is dog.\n");
      setTimeout(function(){ // => "timeout" event
        response.write("Dog is done.\n");
        response.end();
      }, 5000);
    }

    server
      .on('request', callback) // => "request" event
      .listen(8080);

    console.log ('Listening on 8080');
```
    

