//require modules
const socket = require('socket.io');
const multer = require('multer');
const path = require('path');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=require('express')();

//connect to db
mongoose.connect('mongodb://localhost:27017/E-Talk', {
    useUnifiedTopology: true,
    useNewUrlParser: true 
});

mongoose.connection.once('open', ()=>{
    console.log('Connected to database');
}).on('error', err => {console.log(err);});

//set up image storage
const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) =>{
        cb(null, 'PROFILE-' + req.body.uid + Date.now() + path.extname(file.originalname));
    }
});

exports.upload = multer({
    storage,
    limits: {fileSize: 1000000000}
}).single('profilePic');

//use middleware
app.use(cors());
app.use(bodyParser.json());

//initialize routes
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/friends', require('./routes/friends'));

const server = app.listen(5000);

require('./socketEvents')(socket(server));