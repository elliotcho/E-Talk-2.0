const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: Date,
    profilePic: String,
    friends: [String]
});

const NotificationSchema = new Schema({
    senderId: String,
    receiverId: String,
    postId: String,
    date: Date,
    seen: Boolean, 
    msg: String, 
    type: String
});

const FriendRequestSchema = new Schema({
    senderId: String,
    receiverId: String, 
    date: Date,
    seen: Boolean
});

const CommentSchema = new Schema({
    uid: String,
    createdAt: Date,
    content: String,
    likes: [String]
});

const PostSchema = new Schema({
    uid: String,
    createdAt: Date, 
    content: String,
    likes: [String],
    comments: [CommentSchema]
});

const MessageSchema = new Schema({
    uid: String,
    chatId: String,
    content: String,
    timeSent: Date,
    readBy: [String]
});

const ChatSchema = new Schema({
    members: [String],
    createdAt: Date,
    createdBy: String,
    messages: [MessageSchema]
});

exports.User=mongoose.model('user', UserSchema);
exports.Notification=mongoose.model('notification', NotificationSchema);
exports.FriendRequest=mongoose.model('friendrequest', FriendRequestSchema);
exports.Comment=mongoose.model('comment', CommentSchema);
exports.Post=mongoose.model('post', PostSchema);
exports.Message = mongoose.model('message', MessageSchema);
exports.Chat = mongoose.model('chat', ChatSchema);