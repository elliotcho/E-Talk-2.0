const {User} = require('../dbschemas');


const fs = require('fs');
const path = require('path');
const router = require('express').Router();

const {
    upload
} = require('../app.js');

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
                    friends: [],
                    chats: []
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

router.get('/search/:name', (req, res) =>{
   let {name} = req.params;

   let listOfNames = [];

   if(name.includes(" ")){
       split = name.split(" ");

       split.forEach(word =>{
           listOfNames.push(word.toLowerCase());
        });
   }

   else{
       listOfNames.push(name.toLowerCase());
   }

   User.find({}).then(result =>{
        const users = [];

        for(let i = 0; i < result.length; i++){
            let fName = result[i].firstName.toLowerCase();
            let lName = result[i].lastName.toLowerCase();

            let userNames = `${fName} ${lName}`.split(" ");

            for(let j=0;j<userNames.length;j++){
                let found = false;

                for(let k = 0; k < listOfNames.length; k++){
                    if(userNames[j].startsWith(listOfNames[k])){
                        if(j == 0){
                            users.unshift(result[i]);
                        }

                        else{
                            users.push(result[i]);
                        }

                        found = true;
                        break;
                    }
                }

                if(found){break;}
            }
        }

        res.json({users});
   });
});

module.exports = router;