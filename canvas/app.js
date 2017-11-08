const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('view engine', 'hbs');

app.use('/socket-io',
    express.static('node_modules/socket.io-client/dist'));

app.get('/', function (req, res) {
    res.render('canvas-exercises.hbs')
});







http.listen(8000, function () {
    console.log('Listening on port 8000');
});