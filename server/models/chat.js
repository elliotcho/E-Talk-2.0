const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    uid: String,
    content: String,
    timeSent: Date,
    readBy: [String],
    seenBy: [String]
});

const ChatSchema = new Schema({
    members: [String],
    createdAt: Date,
    createdBy: String,
    messages: [MessageSchema],
    timeOfLastMessage: Date
});

exports.Message = mongoose.model('message', MessageSchema);
exports.Chat = mongoose.model('chat', ChatSchema);