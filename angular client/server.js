const express = require('express');
const bodyParser = require('body-parser');

    const hostname = '192.168.1.48';
    const port = 4200;

const server = express();

server.listen(port, hostname, () => {
    console.log('server running at Http://${hostname}:${port}/');
});

server.use(express.static(__dirname + '/dist'))