const { Schema, model } = require('mongoose');

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  avatar: { type: String },
  trails: [{ type: String }]
});

module.exports = model('User', User);
