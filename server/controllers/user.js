const {User} = require('../models/user');
const {FriendRequest} = require('../models/friendRequest');
const {Notification} = require('../models/notif');
const {Project} = require('../models/project');

const bcrypt = require('bcrypt');
const upload = require('../app.js').profilePicUpload;
const path = require('path');
const fs = require('fs');

exports.login = async (req, res) =>{
    const {email, password} = req.body;

    const user = await User.login(email, password);

    res.json(user);
}

exports.signUp = async (req, res) => {    
    const user = await User.findOne({email : req.body.email});
    
    if(user !== null){
        res.json({msg: 'Email is already taken by another user'});
    }
    
    else{
        const newUser = new User({
            ...req.body,
            createdAt: new Date(),
            profilePic: null,
            bio: null,
            friends: [], 
            chats: [], 
            skills: []
        });
    
        const user = await newUser.save();
    
        res.json({msg: 'Success', uid: user._id});
    }
}

exports.getUserInfo = async (req, res) =>{
    const user = await User.findOne({_id: req.params.uid});

    if(user === null){
        res.json({
            _id: req.params.uid,
            firstName: 'E-Talk',
            lastName: 'User'
        });
    } else{
        res.json(user);
    }
}

exports.updateProfilePic = (req, res) =>{
    upload(req ,res , async err => {
        if(err){
            console.log(err);
        }

        const {uid} = req.body;

        const user = await User.findOne({_id: uid});

        if(user.profilePic !== null){
            fs.unlink(path.join(__dirname, '../', `images/profile/${user.profilePic}`), err =>{
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

    if(user === null || user.profilePic === null){
        res.sendFile(path.join(__dirname, '../', `images/profile/avatar.jpg`));
    }

    else{
        res.sendFile(path.join(__dirname, '../', `images/profile/${user.profilePic}`));
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
         }
     }
 
     res.json(result);
 }

 exports.getUserBio = async (req, res) => {
     const {uid} = req.params;

     const user = await User.findOne({_id: uid});
     const {bio} = user;
     
    res.json({bio})
 }

 exports.updateBio = async (req, res) => {
    const {uid, content} = req.body;

    await User.updateOne({_id: uid}, {bio: content});

    res.json({msg: 'Success'});
 }

 exports.getSkills = async (req, res) => {
     const {uid} = req.params;

     const user = await User.findOne({_id: uid});

     res.json(user.skills);
 }

 exports.addSkill = async (req, res) => {
     const {uid, newSkill} = req.body;

     const user = await User.findOne({_id: uid});
     const {skills} = user;

     skills.push(newSkill);

     await User.updateOne({_id: uid}, {skills});
     res.json({msg: 'Success'});
 }

 exports.deleteSkill = async (req, res) => {
     const {uid, idx} = req.params;

     const user = await User.findOne({_id: uid});
     const {skills} = user;

     skills.splice(idx, 1);

     await User.updateOne({_id: uid}, {skills});
     res.json({msg: 'Success'});
 }

 exports.changeName = async (req, res) => {
     const { uid, firstName, lastName } = req.body;
   
     if(firstName && !lastName){
         await User.updateOne(
             {_id: uid}, {firstName}
         );

         res.json({msg:'Your first name has been updated'});
     }

     else if(!firstName && lastName){
        await User.updateOne(
            {_id: uid}, {lastName}
        );

        res.json({msg: 'Your last name has been updated'});
     }

     else{
         await User.updateOne(
             {_id: uid}, {firstName, lastName}
          );
         
         res.json({msg:'Your full name has been updated'});
     }
 }

 exports.changePassword = async (req, res) => {
     const { uid, currPwd, newPwd } = req.body;

     const user = await User.findOne({_id: uid});
     const { password } = user;

     const valid = await bcrypt.compare(currPwd, password);

     if(valid){
        await User.updateOne({ _id: uid }, { password: newPwd });
        res.json({msg: 'Your password has been changed'});

     } else{
         res.json({msg: 'Your password is incorrect'});
     }
 }

 exports.deleteUser = async (req, res) => {
     const { uid } = req.params;

     const user = await User.findOne({_id: uid});
     const {profilePic} = user;

     //delete profile picture from file system if user has one
     if(profilePic){
        const pathName = path.join(__dirname, '../', `images/profile/${profilePic}`);

        fs.unlink( pathName, (err) => {
            if(err){
                console.log(err)
            }
        });
     }
     
     //delete user from others' friends lists
     const userFriends = await User.find({_id: { $in : user.friends }});

     for(let i=0;i<userFriends.length;i++){
         for(let j=0;j<userFriends[i].length;j++){
             if(userFriends[i].friends[j] === uid){
                userFriends[i].friends.splice(j, 1);

                await User.updateOne({_id: userFriends[i]._id}, {friends: userFriends[i].friends});

                break;
            }
         }
     }

     //delete any notification/fr/projects that involve the user
     await FriendRequest.deleteMany({receiverId: uid});
     await FriendRequest.deleteMany({senderId: uid});
     await Notification.deleteMany({receiverId: uid});
     await Notification.deleteMany({senderId : uid});
     await Project.deleteMany({uid});

     //delete the user
     await User.deleteOne({_id: uid});

     res.json({msg: 'User deleted'});
 }