const {User} = require('../models/user');

const fs = require('fs');
const path = require('path');
const {upload} = require('../app.js');

exports.login = async (req, res) =>{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user === null || user.password !== password){
        res.json({msg: "Email or password is incorrect"});
    }

    else{
        res.json({msg: "Success", uid: user._id});
    }
}

exports.signUp = async (req, res) => {
        const {firstName, lastName, email, password, confirmPassword} = req.body;
    
        if(password !== confirmPassword){
            res.json({msg: 'Passwords do not match'});
        }
    
        else{
            const user = await User.findOne({email});
    
            if(user !== null){
                res.json({msg: 'Email is already taken by another user'});
            }
    
            else{
                const newUser = new User({
                    firstName, 
                    lastName, 
                    email, 
                    password,
                    createdAt: new Date(),
                    profilePic: null,
                    friends: [], 
                    chats: []
                });
    
                const user = await newUser.save();
    
                res.json({msg: 'Success', uid: user._id});
            }
        }
}

exports.getUserInfo = async (req, res) =>{
    const user = await User.findOne({_id: req.params.uid});
    res.json(user);
}

exports.updateProfilePic = (req, res) =>{
    upload(req ,res , async err => {
        if(err){
            console.log(err);
        }

        const {uid} = req.body;

        const user = await User.findOne({_id: uid});

        if(user.profilePic !== null){
            fs.unlink(path.join(__dirname, '../', `images/${user.profilePic}`), err =>{
                if(err){
                    console.log(err);
                }
            });
            
            await User.updateOne({_id: uid}, {profilePic: req.file.filename});
        }

        res.json({msg: 'Success'});
    });
}

exports.loadProfilePic = async (req, res)=>{
    const user = await User.findOne({_id: req.params.uid});

    if(user.profilePic === null){
        res.sendFile(path.join(__dirname, '../', `images/avatar.jpg`));
    }

    else{
        res.sendFile(path.join(__dirname, '../', `images/${user.profilePic}`));
    }
}

exports.searchUser =  async (req, res) =>{
    let {query, uid} = req.body;
   
    query = query.split(" ").join("").toLowerCase();
 
    const user = await User.findOne({_id: uid});
    const friends = await User.find({_id: {$in: user.friends}});
 
    const result = [];
    const seen = {};
 
    for(let i=0; i<friends; i++){
        let friendFirstName = friends[i].firstName.split(" ").join("").toLowerCase();
        let friendLastName = friends[i].lastName.split(" ").join("").toLowerCase();
 
        if((friendFirstName + friendLastName).startsWith(query)){
            seen[friends[i]._id] = true;
            
            result.push(friends[i]);
        }
    }
 
     //improve search algorithm
     const users = await User.find({});
 
     for(let i=0;i<users.length;i++){
         let userFirstName = users[i].firstName.split(" ").join("").toLowerCase();
         let userLastName = users[i].lastName.split(" ").join("").toLowerCase();
    
         if((userFirstName + userLastName).startsWith(query) && !seen[users[i]._id]){
             result.push(users[i]);
             j++;
         }
     }
 
     res.json(result);
 }