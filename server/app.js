//require modules
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

//set up middleware
app.use(cors());
app.use(bodyParser.json());



const {
    login,
    signup
} = require('./handlers/users');

app.post('/login', login);
app.post('/signup', signup);

app.listen(5000);