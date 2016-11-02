# Examples streams

## [`through2`](https://www.npmjs.com/package/through2)

To make a **Transform stream** (Duplex stream) out of a function. To pipe read and write and add filters in between.

```javascript
var fs = require('fs')
var through = require('through2');

var myReadFileStream = fs.createReadStream( 'test.txt','utf-8')
var myWriteFileStream = fs.createWriteStream('output.txt')

myReadFileStream
    .pipe(through(function( chunk, _ , next) {
        this.push( chunk.toString().toUpperCase() );
        next();
    }))
    .pipe(myWriteFileStream)
```

## [`concat-stream`](https://www.npmjs.com/package/concat-stream)

**Writable stream** that concatenates all the data from a stream and calls a callback with the result. Use this when you want to collect all the data from a stream into a single buffer.

```javascript
var fs = require('fs')
var concat = require('concat-stream')

var myReadFileStream = fs.createReadStream( 'test.txt')
var myWriteFileStream = fs.createWriteStream('output.txt')

myReadFileStream
    .pipe( concat( function(out)  {
        console.log( out.toUpperCase() )
    }) )
```

```javascript
var http = require('http');
var requiredUrl = process.argv[2];

var bl = require('bl')

http.get(requiredUrl, function(response) { // response is a (Readable) STREAM
    response.setEncoding('utf8')
    response
        .pipe( bl(handleFinalStream) )
        .pipe( process.stdout )
})

function handleFinalStream(streamComplete) {
    console.log(streamComplete.length);
    console.log(streamComplete);
}
```

## [`bl`](https://www.npmjs.com/package/bl)

Buffer List: collect buffers and access with a standard readable Buffer interface, streamable too!

`bl` is a Node [Duplex Stream](http://nodejs.org/docs/latest/api/stream.html#stream_class_stream_duplex), so it can be read from and written to like a standard Node stream. You can also pipe() to and from a bl instance.

As writable stream... 

```javascript
const bl = require('bl')
const fs = require('fs')

fs.createReadStream('README.md')
  .pipe(bl(function (err, data) {
    console.log( data.toString() )
  }))
```

As readable stream... 

```javascript
const BufferList = require('bl')
const fs = require('fs')

var bl = new BufferList()
bl.append(new Buffer('abcd'))
bl.append(new Buffer('efg'))
bl.append(new Buffer('hi'))
bl.append(new Buffer('j'))

bl.pipe(fs.createWriteStream('gibberish.txt'))
```