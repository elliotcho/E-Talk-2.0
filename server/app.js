//require modules
const multer = require('multer');
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

//use middleware
app.use(cors());
app.use(bodyParser.json());

//initialize routes
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

app.listen(5000);