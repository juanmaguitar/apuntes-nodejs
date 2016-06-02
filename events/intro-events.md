# Eventos

## Eventos en el DOM 

El DOM lanza eventos (`click`, `submit`, `hover`). 
Podemos escuchar estos eventos y adjuntar funciones que seran ejecutadas cuando se produzcan estos eventos

```javascript
$("button").on("click", function() {
    // When button is clicked do this
})
```

## Eventos en node

Muchos objetos de node emiten eventos. Estos objetos heredan del constructor `EventEmitter`

- la clase `net.Server` hereda de `EventEmitter` y emite el evento `request`
- `fs.readStrem` devuelve un stream que hereda de `EventEmitter` y que emite el evento `data` segun vamos leyendo datos del archivo

## Eventos _"custom"_

```javascript
var EventEmitter = require('events').EventEmitter;
var logger = new EventEmitter();
logger.on('error', function(message){
    console.log('ERR: ' + message);
});
logger.emit('error', 'Spilled Milk');
logger.emit('error', 'Eggs Cracked');
```
