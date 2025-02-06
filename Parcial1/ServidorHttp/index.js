const http = require('http');

let server = http.createServer(function (req, res) {
    res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
    //res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('hello world!');
});

server.listen(3000, () => {
    console.log("Servidor http escuchando en 3000");
});
