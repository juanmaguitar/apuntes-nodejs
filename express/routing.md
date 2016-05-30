# Routing

```javascript
var app = require("express")();
app.get("/", function(req, res){
    res.send("Hello World!!!!");
});
app.listen(8080);
```

- Las rutas se utilizan para manejar peticiones HTTP

- Una ruta es una combinación de:
    - _path_ o ruta
    - _route handler_, function _callback_ que se ejecutará cuando la petición se corresponda con la ruta

- Las rutas se definen utilizando los siguientes métodos (cada uno maneja un tipo diferente de _HTTP request_):

    + [`app.all()`](http://expressjs.com/en/4x/api.html#app.all)
    + [`app.get()`](http://expressjs.com/en/4x/api.html#app.get) 
    + [`app.post()`](http://expressjs.com/en/4x/api.html#app.post.method) 
    + [`app.delete()`](http://expressjs.com/en/4x/api.html#app.delete.method)
    + [`app.put()`](http://expressjs.com/en/4x/api.html#app.put.method) 

- Pueden haber multiples _route handlers_ asociados a una misma petición HTTP

- Los _route handlers_ deben terminar la petición `res.end()` o llamar al siguiente _route handler_ con `next`


```javascript
var app = require("express")();
app.get("/", function(req, res, next){
    res.write("Hello");
    next();
});
app.get("/", function(req, res, next){
    res.write(" World !!!");
    res.end();
});
app.listen(8080);
```


