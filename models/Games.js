var mongoose = require('mongoose');
//Each game has a gameCode and an array of pixels(id, color)
var GameSchema = new mongoose.Schema({
  gameCode: String,
  pixels: [{ id: Number, color: String }]
});
mongoose.model('Game', GameSchema);
