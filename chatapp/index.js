const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('view engine', 'hbs');
app.use('/socket-io',
    express.static('node_modules/socket.io-client/dist'));

app.get('/', function (req, resp) {
    resp.render('layout.hbs');
});

var numUsers = 0;

io.on('connection', function (client) {
    var addedUser = false;
    console.log('CONNECTED');

    // New Message shown to everyone //
    client.on('incoming', function (msg) {
        //io.emit broadcasts whatever to everyone
        client.broadcast.emit('chat-msg', {
            username: client.username,
            message: msg
        });
    });

    // Adding a new person to chat room //
    client.on('add user', function (username) {
        if (addedUser) return;
        client.username = username;
        ++numUsers;
        addedUser = true;
        client.emit('login', {
            numUsers: numUsers
        });
        client.broadcast.emit('User Joined', {
            username: client.username,
            numUsers: numUsers
        });
    });

    // When someone is typing //
    client.on('typing', function () {
        client.broadcast.emit('stop typing', {
            username: client.username
        });
    });

    // When someone stops typing //
    client.on('stop typing', function () {
        client.broadcast.emit('typing', {
            username: client.username
        });
    });

    // For disconnecting, this executes //
    client.on('disconnect', function () {
        if (addedUser) {
            --numUsers;
            client.broadcast.emit('User Left', {
                username: client.username,
                numUsers: numUsers
            });
        }
        console.log('EXITED');
    });
});


http.listen(8000, function () {
    console.log('On 8000 bruh.');
});