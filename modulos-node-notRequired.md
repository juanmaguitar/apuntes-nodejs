# Modulos node (not required)

##[process](https://nodejs.org/api/process.html)

http://www.hacksparrow.com/understanding-directory-references-in-node-js.html

El objeto [`process`](https://docs.nodejitsu.com/articles/getting-started/the-process-module/) **es global** y es una instancia de [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

- `process.cwd` directorio actual del proceso (directorio desde donde se llama el archivo, [directorio donde se ejecuta `node`](http://www.hacksparrow.com/understanding-directory-references-in-node-js.html))

Con `__dirname` podemos obtener el directorio del archivo que está siendo ejecutado