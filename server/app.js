//require modules
require('dotenv').config();
const socket = require('socket.io');
const multer = require('multer');
const path = require('path');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=require('express')();

//connect to db
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true 
});

mongoose.connection.once('open', ()=>{
    console.log('Connected to database');
}).on('error', err => {console.log(err);});

//set up image storage
const profilePicStorage = multer.diskStorage({
    destination: './images/profile',
    filename: (req, file, cb) =>{
        cb(null, 'PROFILE-' + req.body.uid + Date.now() + path.extname(file.originalname));
    }
});

exports.profilePicUpload = multer({
    storage: profilePicStorage,
    limits: {fileSize: 1000000000}
}).single('profilePic');

const msgPicStorage = multer.diskStorage({
    destination: './images/messages',
    filename: (req, file, cb) => {
        cb(null, 'MESSAGE-' + Date.now() + path.extname(file.originalname))
    }
});

exports.msgPicUpload = multer({
    storage: msgPicStorage,
    limits: {fileSize: 1000000000}
}).single('msgPic');

//use middleware
app.use(cors());
app.use(bodyParser.json());

//initialize routes
app.use('/users', require('./routes/user'));
app.use('/posts', require('./routes/post'));
app.use('/friends', require('./routes/friends'));
app.use('/notifs', require('./routes/notif'));
app.use('/chats', require('./routes/chat'));
 
const server = app.listen(process.env.PORT || 5000);

require('./socket/socketEvents')(socket(server));     