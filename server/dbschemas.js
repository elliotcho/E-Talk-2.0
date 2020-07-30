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

const CommentSchema = new Schema({
    uid: String,
    createdAt: Date,
    content: String,
    likes: [String]
});

const FriendRequestSchema = new Schema({
    senderId: String,
    receiverId: String, 
    date: Date,
    seen: Boolean
});

const PostSchema = new Schema({
    uid: String,
    createdAt: Date, 
    content: String,
    likes: [String],
    comments: [CommentSchema]
});

exports.User=mongoose.model('user', UserSchema);
exports.Comment=mongoose.model('comment', CommentSchema);
exports.Post=mongoose.model('post', PostSchema);
exports.FriendRequest=mongoose.model('friendrequest', FriendRequestSchema);