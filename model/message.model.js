const mongoose = require("mongoose");

// Chat Message Schema
const MessageSchema = new mongoose.Schema(
  {
    conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: "conversations" },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    text: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Message = mongoose.model("message", MessageSchema);

module.exports = { Message };
