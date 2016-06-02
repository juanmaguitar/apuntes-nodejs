# Anatomia de una transacción HTTP

## Crear el servidor 

Lo primero que hay que hacer es crear el servidor web 

```javascript
var server = http.createServer();
server.on('request', function(request, response) {
  // the same kind of magic happens here!
});
```

[`createServer()`](https://nodejs.org/api/http.html#http_http_createserver_requestlistener) devuelve un objeto (`server`)instancia de [`http.Server`](https://nodejs.org/api/http.html#http_class_http_server) que es un `EventEmitter` con varios eventos asociados, entre ellos el [evento `request`](https://nodejs.org/api/http.html#http_event_request).

Cada vez que se produce una petición se lanza el evento _request_.
El objeto `server` le pasa al event handler de este evento _request_ los objetos `request` y `response` para manejar la transacción.

Para poder recibir peticiones, hay que lanzar el método `listen` del objeto _server_

## El objeto `request` 

El objeto `request` recibido en el handler de la request es una instancia de [`http.IncomingMessage`](https://nodejs.org/dist/latest-v4.x/docs/api/http.html#http_class_http_incomingmessage). Por ello tenemos disponibles en el objeto propiedades como:

- `request.url`
- `request.method`
- `request.headers`

```javascript
var method = request.method;
var url = request.url;
var headers = request.headers;
var userAgent = headers['user-agent'];
```

El objeto `request` recibido en el handler de la request implementa la interfaz [ReadableStream](https://nodejs.org/api/stream.html#stream_class_stream_readable) por lo que podemos escuchar los eventos tipicos de stream y hacer cosas con ellos

En el caso de una petición `POST` o `PUT` [podria hacer falta algo asi](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#request-body):

```javascript
var body = [];
request.on('data', function(chunk) {
  body.push(chunk);
}).on('end', function() {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
});
```

En caso de capturar la entrada de datos desde el _stream request_ es recomendable capturar el error en caso de que se produzca

```javascript
request.on('error', function(err) {
  // This prints the error message and stack trace to `stderr`.
  console.error(err.stack);
});
```

## El objeto `response` 

`response` es una instancia de [`http.ServerResponse`](https://nodejs.org/dist/latest-v4.x/docs/api/http.html#http_class_http_serverresponse) a traves del cual disponemos de métodos y propiedades para manejar :

### Las cabeceras de la respuesta 

#### `response.statusCode`

Por defecto será siempre `200` pero podemos setearlo para mandar un código de status diferente (`404` Archivo no encontrado, `500` Error de Servidor, etc...)

```javascript
response.statusCode = 404; // Tell the client that the resource wasn't found.
```

#### `response.setHeader`

Para setear las cabeceras de la respuesta

```javascript
response.setHeader('Content-Type', 'application/json');
response.setHeader('X-Powered-By', 'bacon');
```

#### [`response.writeHead`](https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers)

Con `response.statusCode` y `response.setHeader`, seteamos estos valores y dejamos a node que los mande con los datos.

Pero podemos escribir directamente nosotros (en el _stream_ response) las cabeceras con `writeHead`

```javascript
response.writeHead(200, {
  'Content-Type': 'application/json',
  'X-Powered-By': 'bacon'
}); 
```

### El cuerpo de la respuesta 

Como el objeto `response`es un `WritableStream` podemos escribir en él utilizando los metodos _stream_

```javascript
response.write('<html>');
response.write('<body>');
response.write('<h1>Hello, World!</h1>');
response.write('</body>');
response.write('</html>');
response.end();
```

Tambien aqui se recomienda capturar el error

```javascript
response.on('error', function(err) {
    console.error(err);
});
```

## Utilizando `pipe`

Puesto que tanto `request` como `response` son strems, podemos conectarlos para crear un efecto _eco_ (los datos recibidos seran devueltos en la respuesta)

```javascript
var http = require('http');

http.createServer(function(request, response) {
  if (request.method === 'GET' && request.url === '/echo') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
```