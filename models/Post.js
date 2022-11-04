const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter blog title"],
    unique: true,
    maxLength: [100, "Blog title cannot exceed 100 characters"],
  },
  content: {
    type: String,
    required: [true, "Please enter blog content"],
  },

  category: {
    type: String,
    required: false,
  },

  // photo: {
  //     type: String,
  //     required: true
  // },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    reference: "User",
    required: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
