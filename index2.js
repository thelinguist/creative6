var app = require('express')();
var http = require('http').Server(app);
//this is where the events and stuff comes from
var io = require('socket.io')(http);
var colors = [];

/* this is the main page we will serve */
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*this is for reference. It's a demo of the socketIO stuff */
app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

//io.on = when request detected
//socket.on('disconnect') = when disconnect detected
io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('allColors', colors);				//tell everyone what the board looks like before they do anything
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  //this function is for the chat app
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
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
http.listen(5723, function(){
  console.log('listening on *:5723');
});
