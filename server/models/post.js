const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    uid: String,
    createdAt: Date,
    content: String
});

const PostSchema = new Schema({
    uid: String,
    createdAt: Date, 
    content: String,
    likes: [String],
    comments: [CommentSchema]
});

exports.Comment=mongoose.model('comment', CommentSchema);
exports.Post=mongoose.model('post', PostSchema);