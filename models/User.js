const mongoose = require('mongoose');
const groupSchema = require('./Group');

//Create Schema
const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true
  },
  groups: Array,
  folders: Array    
});

const User = mongoose.model('User', userSchema);
module.exports = User;