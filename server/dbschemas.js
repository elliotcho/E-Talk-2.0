const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: Date,
    profilePic: String
});

exports.User=mongoose.model('user', UserSchema);