const {User} = require('../dbschemas');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = require('express').Router();

//use multer to upload profile pictures
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../', 'images'),
    filename: (req, file, cb) =>{
        cb(null, 'PROFILE-' + req.body.uid + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: {fileSize: 1000000000}
}).single('profilePic');

router.post('/login', (req, res) =>{
    const {email, password} = req.body;
    
    User.findOne({email}).then(result =>{
        if(result === null || password !== result.password){
            res.json({msg: "Email or password is incorrect"});
        }

        else{
            res.json({msg: "Success", ...result})
        }
    });
});

router.post('/signup', (req, res)=>{
    const {firstName, lastName, email, password, confirmPassword} = req.body;

    if(password !== confirmPassword){
        res.json({msg: 'Passwords do not match'});
    }

    else{
        User.findOne({email}).then(result =>{
            if(result!==null){
                res.json({msg: 'Email is already taken by another user'});
            }

            else{
                const newUser = new User({
                    firstName, lastName, email, password,
                    createdAt: new Date(),
                    profilePic: null,
                    friends: []
                });

                newUser.save().then(user =>{
                    res.json({msg: 'Success', ...user});
                });
            }
        });
    }
});

router.get('/:uid', (req, res) =>{
    User.findOne({_id: req.params.uid}).then(result =>{
        res.json({
            firstName: result.firstName,
            lastName: result.lastName
        });
    });
});

router.post('/profilepic', (req, res) =>{
    upload(req ,res , err => {
        if(err){
            console.log(err);
        }

        User.findOne({_id: req.body.uid}).then(result => {
            if(result.profilePic !== null){
                fs.unlink(path.join(__dirname, '../', `images/${result.profilePic}`), err =>{
                    if(err){
                        console.log(err);
                    }
                });
            }

            User.updateOne({_id: req.body.uid}, {profilePic: req.file.filename}).then(() =>{
                res.json({msg: 'Success'});
            });
        });
    });
});

router.get('/profilepic/:uid', (req, res)=>{
    User.findOne({_id: req.params.uid}).then(result =>{
        if(result.profilePic === null){
            res.sendFile(path.join(__dirname, '../', `images/avatar.jpg`));
        }

        else{
            res.sendFile(path.join(__dirname, '../', `images/${result.profilePic}`));
        }
    });
});

module.exports = router;