const {User, Message, Chat} = require('../dbschemas');

const router = require('express').Router();

router.get('/user/:uid', async (req, res) =>{
    const {uid} = req.params;

    const user = await User.findOne({_id: uid});
    const chats = await Chat.find({_id: {$in: user.chats}});

    chats.sort((a, b) => b.timeOfLastMessage - a.timeOfLastMessage);

    res.json(chats);
});

router.post('/photo', async (req, res) =>{
    const {chatId, uid} = req.body;

    const chat = await Chat.findOne({_id: chatId});
    const {members} = chat;

    if(members.length === 1){
        res.json([uid]);
    }

    else{
        const result = [];
        const numUsers = (members.length === 2)? 1: 2
    
        for(let i=members.length-1, j=0;i>=0 && j<numUsers;i--){
            if(members[i] === uid){
                continue;
            }
    
            result.push(members[i]);
            j++;
        }
        
        res.json(result);
    }
 });

router.post('/create', async (req, res)=>{
    const {uid, recipients, content} = req.body;

    const members = recipients.map(user =>
        user._id
    );

    if(!members.includes(uid)){
        members.push(uid);
    }

    const newChat = await new Chat({
        members,
        createdAt: new Date(),
        createdBy: uid, 
        messages: [],
        timeOfLastMessage: new Date()
    }).save();

    const newMessage = new Message({
        uid, 
        content, 
        timeSent: new Date(),
        readBy: [uid],
        seenBy: [uid]
    });
 
    await Chat.updateOne({_id: newChat._id}, {messages: [newMessage]});

    for(let i=0;i<members.length;i++){
        const user = await User.findOne({_id: members[i]});

        user.chats.push(newChat._id);

        await User.updateOne({_id: user._id}, {chats: user.chats});
    }

    res.json({chatId: newChat._id});
});

router.get('/messages/:chatId', async (req, res) =>{
    const {chatId} = req.params;

    const chat = await Chat.findOne({_id: chatId});
    const {messages} = chat;

    res.json(messages);
});

router.post('/messages/read', async (req, res) =>{
    const {chatId, uid} = req.body;

    const chat = await Chat.findOne({_id: chatId});
    const {messages} = chat;

    for(let i=0;i<messages.length;i++){
        if(messages[i].readBy.includes(uid)){
            continue;
        }

        messages[i].readBy.push(uid);
    }

    await Chat.updateOne({_id: chatId}, {messages});

    res.json({msg: 'Success'});
});

router.post('/members', async (req, res) =>{
    const {uid, chatId} = req.body;

    let result = '';

    const chat = await Chat.findOne({_id: chatId});

    if(chat !== null){
        const members = chat.members;

        members.splice(members.indexOf(uid), 1);
    
        for(let i=0;i<members.length;i++){
            const user = await User.findOne({_id: members[i]});
    
            let name = `${user.firstName} ${user.lastName}`;
    
            if(i !== members.length-1){
                result+=`${name}, `;
            }
    
            else{
                result+=`${name}`
            }
        }
    
        res.json({memberNames: result});
    }
});

router.get('/unseen/:uid', async (req, res) =>{
    const {uid} = req.params;

    const user = await User.findOne({_id: uid});
    const {chats} = user;

    let count = 0;

    for(let i=0;i<chats.length;i++){
        const chat = await Chat.findOne({_id: chats[i]});
        const {messages} = chat;
        const n = messages.length;

        if(messages[n-1].seenBy.includes(uid)){
            continue;
        }

        count++;
    }

    res.json({unseenChats: count});
});

router.put('/see/:uid', async (req, res) =>{
    const {uid} = req.params;

    const user = await User.findOne({_id: uid});
    const {chats} = user;

    for(let i=0;i<chats.length;i++){
        const chat = await Chat.findOne({_id: chats[i]});
        const {messages} = chat;
        const n = messages.length;

        if(!messages[n-1].seenBy.includes(uid)){
            messages[n-1].seenBy.push(uid);
        } 

        await Chat.updateOne({_id: chats[i]}, {messages});
    }

    res.json({msg: 'Success'});
});

module.exports = router;