const {User, Message, Chat} = require('../dbschemas');

const router = require('express').Router();

router.get('/user/:uid', async (req, res) =>{
    const {uid} = req.params;

    const user = await User.findOne({_id: uid});
    const chats = await Chat.find({_id: {$in: user.chats}});

    chats.sort((a, b) => b.timeOfLastMessage - a.timeOfLastMessage);

    res.json(chats);
});

router.get('/:id', async (req, res) =>{
    const {id} = req.params;

    const chat = await Chat.findOne({_id: id});

    res.json(chat);
});

router.post('/create', async (req, res) =>{
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
        cratedBy: uid, 
        messages: [],
        timeOfLastMessage: new Date()
    }).save();

    const newMessage = new Message({
        uid, 
        content, 
        timeSent: new Date(),
        readBy: []
    });

    await Chat.updateOne({_id: newChat._id}, {messages: [newMessage]});

    for(let i=0;i<members.length;i++){
        const user = await User.findOne({_id: members[i]});

        user.chats.push(newChat._id);

        await User.updateOne({_id: user._id}, {chats: user.chats});
    }


    res.json({members});
});


module.exports = router;