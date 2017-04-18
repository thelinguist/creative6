var selectedColor = "white";

function changeColor(id) {
	var chosenColor = $(id).css("backgroundColor");
	selectedColor = chosenColor;
}

$(function()
{
	  var socket = io();
	  //send the color
	  $('.circle').click(function() {
		  var selectedCircle = $(this).attr("id");
		  var jsonColor = {'id': selectedCircle, 'color': selectedColor};
		  			console.log(jsonColor);
		  socket.emit('colorMessage', jsonColor);
	  });
	  //get a list of all the colors
	  socket.on('allColors', function(allColors) {
		  $.each(allColors, function(i) {
			  /*
			  if($('#' + allColors[i].id).css("background-color") != "rgb(14, 2, 3)") {
				  $('#' + allColors[i].id).css("border-color", "rgb(14, 2, 3)");
			  }
			  */
			  $('#' + allColors[i].id).css("background-color", allColors[i].color);
		  });
	  });
	  //in case things get crazy
	  $('#secret').click(function() {
		  var pass = prompt("nice find, what's the pass to reset?", "putinsux");
		  socket.emit('reset', pass);
	  });
});