const mongoose = require('mongoose');
const userSchema = require('./User');

//Create Schema
const groupSchema = new mongoose.Schema({
  groupname: { 
    type: String,
    required: false
  }
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;