# Modulos node (`require`)

- http
- url
- path
- fs
- util

## [http](https://nodejs.org/api/http.html#http_http)

Maneja servidores y clientes HTTP desde node

    var http = require('http');

### [`http.createServer`](https://nodejs.org/api/http.html#http_http_createserver_requestlistener) 

```javascript
http.createServer([requestListener])
```

Devuelve una instancia (_server_) de [`http.Server`](https://nodejs.org/api/http.html#http_class_http_server) → `server`

```javascript
var server = http.createServer();
 
server.on("request", function (req, res) {
    res.end("this is the response");
});
 
server.listen(3000);
```

Si se le pasa el callback `requestListener` (opcional) se añadirá automaticamente al evento `request`

```javascript
var server = http.createServer(function(request, response) {
  // magic happens here!
});
```


- [`server.listen(port)`](https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback) inicia un socket escuchando las conexiones en el puerto especificado


## [url](https://nodejs.org/api/url.html)

Utilidades para parseado y obtencion de info de url's 

    var url = require('url');

Una vez tenemos un objeto URL a traves de [`url.parse`](https://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost) podemos acceder a diferentes propiedades de este objeto

    var myUrl = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
    var oUrl = url.parse(myUrl);
    // oUrl.pathname, oUrl.hostname, ...

- **href** → `http://host.com:8080/p/a/t/h?query=string#hash`
- **protocol** → `http:`
- **host**  → `host.com:8080`
- **hostname**  → `host.com`
- **hostname**  → `8080`
- **pathname**  → `/p/a/t/h`
- **search**  → `?query=string`
- **path**  → `/p/a/t/h?query=string`
- **hash**  → `#hash`

## [path](https://nodejs.org/api/path.html)

Utilidades para manejo y transformaciones de rutas de archivos

    var path = require('path');

```javascript 

path.basename('/foo/bar/baz/asdf/quux.html') // 'quux.html'
path.basename('/foo/bar/baz/asdf/quux.html', '.html') // 'quux'

process.env.PATH // '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'
process.env.PATH.split(path.delimiter) // ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']

path.dirname('/foo/bar/baz/asdf/quux') // '/foo/bar/baz/asdf'

path.extname('index.html') // returns '.html'

path.isAbsolute('/foo/bar') // true
path.isAbsolute('qux/')     // false

path.join('/foo', 'bar', 'baz/asdf', 'quux', '..') // returns '/foo/bar/baz/asdf'

path.normalize('/foo/bar//baz/asdf/quux/..') // returns '/foo/bar/baz/asdf'

'foo/bar/baz'.split(path.sep) // returns ['foo', 'bar', 'baz']
```

## [fs](https://nodejs.org/api/fs.html#fs_file_system) 

_FileSystem_. Manejo de archivos desde node.js

    var fs = require('fs');
z

-  [`fs.stat()`](https://nodejs.org/api/fs.html#fs_fs_stat_path_callback), [`fs.statSync()`](https://nodejs.org/api/fs.html#fs_fs_statsync_path), [`fs.lstat()`](https://nodejs.org/api/fs.html#fs_fs_lstat_path_callback), [`fs.lstatSync()`](https://nodejs.org/api/fs.html#fs_fs_lstatsync_path), [`fs.fstat()`](https://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback) y [`fs.fstatSync()`](https://nodejs.org/api/fs.html#fs_fs_fstatsync_fd) devuelve una instancia (_stats_) de [`fs.Stats`](https://nodejs.org/api/fs.html#fs_class_fs_stats)

```javascript
    stats.isFile()
    stats.isDirectory()
    stats.isBlockDevice()
    stats.isCharacterDevice()
    stats.isSymbolicLink() (only valid with fs.lstat())
    stats.isFIFO()
    stats.isSocket()
```






