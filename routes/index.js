var express = require('express');
var router = express.Router();

var http = require('http').Server(express);

//this is where the events and stuff comes from
var io = require('socket.io')(http);
//TODO: init all pixels instead of init an array
var colors = [];

/* this is the main page we will serve */
router.get('/', function(req, res){
    console.log("I'm here...");
    res.sendFile('login.html', {root:'public'});
});

router.get('/test', function(req, res) {
    res.sendFile('login.html', {root:'public'});
});

//io.on = when request detected
//socket.on('disconnect') = when disconnect detected
io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('allColors', colors);				//tell everyone what the board looks like before they do anything
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  //this function is for the colors, it saves the input to "colors" and tells everyone
  socket.on('colorMessage', function(colorMsg) {
    colors.push({id: colorMsg['id'], color: colorMsg['color']});
    console.log(colors);
    io.emit('allColors', colors);
  });

  //this resets everything, in case we need to clear the board
  socket.on('reset', function(res) {
	  if(res == "farsi") {
	  	colors = [];
	  	io.emit('allColors', colors);	//you need to refresh the page to get this to work.. find a way to reset the colors to grey (the colors only keeps track of the changes, so clearing it won't tell the browser to change them back
	  }
  });

});

//whatever this line does, don't forget it at the end
module.exports = io;		// REQ'D for socket.io to listen
module.exports = router;
