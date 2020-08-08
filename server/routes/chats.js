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
        readBy: [uid],
        seenBy: [uid]
    });

    await Chat.updateOne({_id: newChat._id}, {messages: [newMessage]});

    for(let i=0;i<members.length;i++){
        const user = await User.findOne({_id: members[i]});

        user.chats.push(newChat._id);

        await User.updateOne({_id: user._id}, {chats: user.chats});
    }

    res.json({members});
});


router.get('/unseen/:uid', async (req, res) =>{
    const {uid} = req.params;

    const user = await User.findOne({_id: uid});

    const {chats} = user;
    let unseenChats = 0;

    for(let i=0;i<chats.length;i++){
         const chat = await Chat.findOne({_id: chats[i]});
   
        const {messages} = chat;

        let n =messages.length;

        if(n > 0 && !messages[n-1].seenBy.includes(uid)){
            unseenChats++;
        }
    }

    res.json({unseenChats});
});

router.put('/see/:uid', async (req, res) =>{
    const {uid} = req.params;

    const user = await User.findOne({_id: uid});

    for(let i=0;i<user.chats.length;i++){
        const chat = await Chat.findOne({_id: user.chats[i]});

        chat.messages.forEach(msg =>{
            msg.seenBy = [...msg.seenBy, uid];
        });

        await Chat.updateOne({_id: chat._id}, {messages: chat.messages});
    }

    res.json({msg: 'Success'});
});

module.exports = router;