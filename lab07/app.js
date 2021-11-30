'use strict';
const connect = require("connect");
const app = connect();
const serveStatic = require('serve-static');

const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer);

app.use(serveStatic("public"));

io.sockets.on("connection", function (socket) {
    socket.on("test", function (msg) {
        console.log(msg);
        io.emit('test', msg)
    });
    socket.on('disconnect', () => {
        io.emit('test', 'Urzytkownik opuścił czat')
        console.log('Urzytkownik opuścił czat')
    });
});

httpServer.listen(3000, function () {
    console.log('Serwer HTTP działa na porcie 3000');
});
