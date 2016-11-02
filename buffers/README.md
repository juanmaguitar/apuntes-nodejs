# Buffers & Streams

**Buffers** provide lower-level access to data in memory than the V8 engine 
provides itself. Effectively, they allow you to directly access the binary data that composes strings rather than a string's encoded value itself. The main benefit is higher performance, since you're sidestepping Node's higher-level string management and working with the data directly.

**Streams** provide a way to read or write data in chunks, rather than all at once. Rather than reading an entire 100 MB text file into memory and processing it all at once, you can "stream" the data in smaller, more manageable portions. Streams emit events as they process chunks, which means that you can listen for those events and act accordingly using the data from the latest chunk. A simple, practical example would be reading data from network I/O and writing it to a file as you receive it. You don't have to wait to get all the data until you dump it from memory to disk; you can do it in stages that Node manages internally.

Streams and buffers are purely Node concepts; Node is a runtime environment, and JavaScript is the language that it uses. Since JavaScript was designed for browsers, the language itself has no direct concept of file I/O, for example.

More info: http://book.mixu.net/node/ch9.html
