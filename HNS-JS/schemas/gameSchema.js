const { model, Schema } = require('mongoose');

let gameSchema = new Schema({
  Guild: String,
  Players: String,
})

module.exports = model('game', gameSchema);