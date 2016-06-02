- Qué son modulos
- Cómo funcionan los modulos en node
- Como utilizar modulos existentes
- Como crear nuestros propios modulos y llamarlos desde otros archivos

## Creando nuestros modulos

`export` define lo que será devuelto a `require`

_custom_hello.js_
```javascript
var hello = function() {
	console.log("hello!");
}
module.exports = hello;
```

_custom_goodbye.js_
```javascript
exports.goodbye = function() {
    console.log('bye!');
}
```

_app.js_
```javascript
var hello = require('./custom_hello');
var gb = require('./custom_goodbye');
hello();
gb.goodbye();
// require('./custom_goodbye').goodbye();
```

## Exportando varias funciones

```javascript
var foo = function() { ... }
var bar = function() { ... }
var baz = function() { ... }

exports.foo = foo
exports.bar = bar
```

_app.js_
```javascript
var myMod = require('./my_module');
myMod.foo();
myMod.bar();
```

var make_request = require('make_request')

## npm

El gestor de paquetes de node

- Viene por defecto con node
- Repositorio de modulos
- Gestion de dependencias
- Facil publicación de modulos

 Instalación local vs global

```javascript
$ npm install coffee-script
$ npm install coffee-script -g
```

Los modulos npm globales no pueden ser requeridos -> uso en linea de comandos
