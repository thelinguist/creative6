//this is where the events and stuff comes from
var io = require('socket.io')();

//mongo stuff, idk why it isn't working
// var mongoose = require('mongoose');
// var Game = mongoose.model('Game');

//TODO: init all pixels instead of init an array
var colors = [];

//let the server pick the colors, not the browser NOTE: not in use yet
var blue ="#1A63FF";
var red ="#f44336";
var green = "#1dff00";
var pink = "#ff00f1"
var yellow ="#c9ff00";
var orange = "#ff8a00";
var white = "white";
var black = "#0E0203";



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

module.exports = io;		// REQ'D for socket.io to listen
