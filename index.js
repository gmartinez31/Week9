const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('view engine', 'hbs');

app.use('/socket-io',
    express.static('node_modules/socket.io-client/dist'));

app.get('/', function (req, resp) {
    response.render('chat.hbs');
});

io.on('connection', function(client) {
    console.log('CONNECTED');

    client.on('incoming', function(msg) {
        //io.emit broadcasts whatever to everyone
        io.emit('chat-msg', msg);
    });

    client.on('join-room', function (room) {
        client.join(room, function () {
            console.log(client.rooms);
            io.to(room).emit('chat-msg', '**new user joined**');
        });
        client.on('incoming', function (msg) {
            io.to(msg.room).emit('chat-msg', msg.msg);
        });
    });
    
    client.on('disconnect', function () {
        console.log('EXITED');
    });
})

http.listen(8000, function () {
    console.log('On 8000 bruh.');
})