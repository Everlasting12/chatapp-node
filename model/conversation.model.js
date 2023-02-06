const mongoose = require('mongoose');


// ConversationSchema
const ConversationSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    members:{
        type:Array
    }
},{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  });

const Conversation = mongoose.model('conversation', ConversationSchema);
module.exports = { Conversation };
