const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
    senderId: String,
    receiverId: String, 
    date: Date,
    seen: Boolean
});

exports.FriendRequest=mongoose.model('friendrequest', FriendRequestSchema);