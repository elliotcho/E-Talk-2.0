const bcrypt = require('bcrypt');
const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: Date,
    profilePic: String,
    friends: [String],
    chats: [String]
});

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.pre('updateOne', async function(next){
    const newData = this.getUpdate();

    if(newData.password){
        const salt = await bcrypt.genSalt();
        newData.password = await bcrypt.hash(newData.password, salt);
    }

    next();
});

UserSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});

    if(user){
        const auth = await bcrypt.compare(password, user.password);

        const success = {uid: user._id, msg: "Success"};
        const failure = {msg: "Incorrect password"};

        return auth ? success: failure;
    }

    else{
        return {msg: "Email is not registered with E-Talk"}
    }
}

exports.User = mongoose.model('user', UserSchema);