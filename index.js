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
    client.on('disconnect', function () {
        console.log('EXITED');
    })
})

http.listen(8000, function () {
    console.log('On 8000 bruh.');
})