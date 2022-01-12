'use strict';
const connect = require("connect");
const app = connect();

const httpServer = require('http').createServer(app);

const SseChannel = require('sse-channel');
const dateChannel = new SseChannel();

const ads = require("./advertising.json")
const getRandomAdd = () => {
    const max = ads.advertising.length
    const rand = Math.floor(Math.random()*max)
    return ads.advertising[rand].description
}

app.use(function(req, res, next) {
 res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
 res.setHeader("Connection", "keep-alive");
 res.setHeader("Cache-Control", "no-cache");
 res.setHeader("Content-Type", "text/event-stream");
 next();
});

app.use(function(req, res) {
 if (req.url.indexOf('/events/add') === 0) {
  dateChannel.addClient(req, res);
 } else {
  res.writeHead(404);
  res.end();
 }
});

setInterval(function broadcastDate() {
 dateChannel.send(getRandomAdd());
}, 5000);


httpServer.listen(7000, function() {
 console.log('Serwer HTTP działa na pocie 7000');
});