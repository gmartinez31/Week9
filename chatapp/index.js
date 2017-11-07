const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use('/socket-io',
    express.static('node_modules/socket.io-client/dist'));
    
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
    console.log('USER CONNECTED');
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function () {
        console.log('USER EXITED');
    });
});



http.listen(8000, function () {
    console.log('On 8000 bruh.');
});