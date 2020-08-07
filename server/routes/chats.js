const {Message, Chat} = require('../dbschemas');

const router = require('express').Router();

router.get('/:id', async (req, res) =>{
    const {chatId} = req.body;

    const chat = await Chat.findOne({_id: chatId});

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
        messages: []
    }).save();

    const newMessage = new Message({
        uid, 
        content, 
        timeSent: new Date(),
        readBy: []
    });

    await Chat.updateOne({_id: newChat._id}, {messages: [newMessage]});

    res.json({chatId: newChat._id, members});
});


module.exports = router;