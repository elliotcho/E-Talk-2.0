const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    senderId: String,
    receiverId: String,
    postId: String,
    date: Date,
    seen: Boolean, 
    msg: String, 
    type: String
});

exports.Notification=mongoose.model('notification', NotificationSchema);