https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/

Event: 'request'#

function (request, response) { }

Emitted each time there is a request. Note that there may be multiple requests per connection (in the case of keep-alive connections). request is an instance of [`http.IncomingMessage`](https://nodejs.org/dist/latest-v4.x/docs/api/http.html#http_class_http_incomingmessage) and response is an instance of [`http.ServerResponse`](https://nodejs.org/dist/latest-v4.x/docs/api/http.html#http_class_http_serverresponse) 



=> Status code pages (400, 200, 500...)
https://moz.com/blog/response-codes-explained-with-pictures
https://www.flickr.com/photos/girliemac/sets/72157628409467125/
http://www.hongkiat.com/blog/common-http-errors/




https://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTP-server/


http://www.murvinlai.com/req-and-res-in-nodejs.html