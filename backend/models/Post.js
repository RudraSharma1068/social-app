const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author:   { type: String, required: true },
  text:     { type: String },
  imageUrl: { type: String },
  likes:    { type: [String], default: [] },
  comments: [{
    username: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
}, { timestamps: true });



module.exports = mongoose.model('Post', postSchema);