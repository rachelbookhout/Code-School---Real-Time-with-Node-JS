'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);
var subSocket = require('./lib/subscribe');
var badges = require('./models/badges')

app.use(express.static('public'));

server.listen(3000,function(){
  console.log('server is running')
});

app.get('/', function(req,res){
  res.sendfile('./public/index.html');
});

io.sockets.on('connection', function(socket){
  badges.get(function(err,data){
    if(err) return;
    data.forEach(function(badge){
      socket.emit('badge', badge);
    });
  });
});

subSocket.on('message',function(message){
  io.socket.emit('badge', message);
});
