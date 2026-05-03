import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  messages: [
    {
      role: {
        type: String,
        enum: ['user', 'assistant']
      },
      content: {
        type: String
      }
    }
  ]
}, { timestamps: true });

export default mongoose.model('Chat', chatSchema);