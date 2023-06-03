const mongoose = require('mongoose');
const { Schema } = mongoose;

const characterSchema = new Schema({
  characters: {
    type: [String],
    default: [],
    required: true
  }
}, {
  timestamps: true
});

const Character = mongoose.model('Character', characterSchema);
module.exports = Character;
