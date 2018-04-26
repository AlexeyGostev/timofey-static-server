const http = require('http');
const static = require('node-static');
const fs = require('fs');
const publicUri = require('./config').uri;
const file = new static.Server(publicUri);

http.createServer((req, res) => {
  let url = req.url;
  let isFile = /.+\..+/.test(url);
  if (!isFile) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    fs.createReadStream(publicUri + '/index.html').pipe(res); 
  } else {
    file.serve(req, res);
  }
}).listen(8080);

console.log('Server running on port 8080');
