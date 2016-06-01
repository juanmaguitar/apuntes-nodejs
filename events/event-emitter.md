
# Event Emitter

```javascript
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
```


```javascript
emitter.on("test", function () { console.log("test"); });
emitter.on("print", function (message) { console.log(message); });
emitter.emit("test");
emitter.emit("print", "message");
emitter.emit("unhandled");
```

Los métodos `on` o `addListener` (_subscribe_) nos permiten asociar una función _callback_ a la ocurrencia de un evento 

El método `emit` (_publish_) nos permite lanzar el evento → lo que provocará que se ejecuten las funciones asociadas al evento


```javascript
function callback() {
  console.log("Callback has been called!");
}

emitter.once("myEvent", callback);
emitter.emit("myEvent");
emitter.emit("myEvent");

emitter.on("myEvent", callback);
emitter.emit("myEvent");
emitter.emit("myEvent");
emitter.removeListener("myEvent", callback);
emitter.emit("myEvent");

emitter.on("myEvent", callback);
emitter.emit("myEvent");
emitter.removeAllListeners("myEvent");
emitter.emit("myEvent");
```

Si usamos `once` en vez de `on`, la función callback se ejecutará SÓLO una vez y despues será eliminada de la lista de callbacks

Con `removeListener` eliminamos un callback específico y con `removeAllListeners` eliminamos TODOS los callbacks de un determinado evento.

## `EventEmitter` dentro de módulos

Varios [módulos de node heredan de `EventEmitter`](http://code.tutsplus.com/tutorials/using-nodes-event-module--net-35941), como por ejemplo el modulo `http` 

```javascript
var http = require("http");
var server = http.createServer();
 
server.on("request", function (req, res) {
    res.end("this is the response");
});
 
server.listen(3000);
```

More info : 
- https://docs.nodejitsu.com/articles/getting-started/control-flow/what-are-event-emitters/

- http://www.hacksparrow.com/node-js-eventemitter-tutorial.html
- https://www.sitepoint.com/nodejs-events-and-eventemitter/