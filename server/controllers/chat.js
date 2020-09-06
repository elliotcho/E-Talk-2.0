const {User} = require('../models/user');
const {Message, Chat} = require('../models/chat');

exports.createMessage = async (req,res) =>{
    const {uid, content, chatId} = req.body;
    
    const chat = await Chat.findOne({_id:chatId});
    const {messages} = chat;

    const newMessage = new Message({
        uid,
        content,
        timeSent: new Date(),
        readBy: [uid],
        seenBy: [uid]
    });

    messages.push(newMessage);
    
    const {timeSent} = newMessage;
    
    await Chat.updateOne(
        {_id:chatId},
        {messages, timeOfLastMessage: timeSent}
    );
    
    res.json(newMessage);
}

exports.getChat = async (req, res) =>{
    const {chatId} = req.params;

    if(chatId !== 'home' && chatId !== 'new'){
        const chat = await Chat.findOne({_id: chatId});

        res.json(chat);
    }
}

exports.getUserChats = async (req, res) =>{
    const {uid} = req.params;

    const user = await User.findOne({_id: uid});
    const chats = await Chat.find({_id: {$in: user.chats}});

    chats.sort((a, b) => b.timeOfLastMessage - a.timeOfLastMessage);

    res.json(chats);
}

 exports.createChat =  async (req, res)=>{
    const {uid, recipients, content} = req.body;

    const members = recipients.map(user => user._id);
    const chatKeys = [];

    if(!members.includes(uid)){
        members.push(uid);
    }

    if(members.length === 2){
        chatKeys.push(members[0] + members[1]);
        chatKeys.push(members[1] + members[0]);
    }

    const newChat = await new Chat({
        members,
        createdAt: new Date(),
        createdBy: uid, 
        messages: [],
        timeOfLastMessage: new Date(),
        chatKey1: chatKeys[0]? chatKeys[0]: null,
        chatKey2: chatKeys[1]? chatKeys[1]: null
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
}

exports.getChatMessages = async (req, res) =>{
    const {chatId} = req.params;

    if(chatId !== 'home' && chatId !=='new'){
        const chat = await Chat.findOne({_id: chatId});
        const {messages} = chat;
    
        res.json(messages);
    }
}

exports.markChatAsRead = async (req, res) =>{
    const {chatId, uid} = req.body;

    if(chatId !== 'home' && chatId !== 'new'){
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
    }
}

exports.getChatMemberIds = async (req, res) => {
    const {chatId, uid} = req.body;

    if(chatId !== 'home' && chatId !== 'new'){
        const chat = await Chat.findOne({_id: chatId});

        if(chat === null){
            res.json({msg: 'Chat not found'});
        }
    
        else{
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
                
                res.json({members: result});
            }
        }
    }
}

exports.getMemberNames = async (req, res) =>{
    const {uid, chatId} = req.body;

    if(chatId !== 'home' && chatId !== 'new'){
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
    }
}

exports.getUnseenChats = async (req, res) =>{
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
}

exports.seeChats = async (req, res) =>{
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
}

exports.checkIfChatExists = async (req, res) =>{
    const {members} = req.body;
    
    const key1 = members[0] + members[1];
    const key2 = members[1] + members[0];

    let chat = await Chat.findOne({chatKey1: key1}) !== null? 
               await Chat.findOne({chatKey1: key1}) :

               await Chat.findOne({chatKey2: key1}) !== null?
               await Chat.findOne({chatKey2: key1}) :

               await Chat.findOne({chatKey1: key2}) !== null?
               await Chat.findOne({chatKey1: key2}) : 
               
               await Chat.findOne({chatKey2: key2}) !== null?
               await Chat.findOne({chatKey2: key2}) :
               false;

    res.json({chat});
}

exports.handleComposerQuery = async (req, res) =>{
    const {uid, name, recipients} = req.body;

    let query = name.split(" ").join("").toLowerCase();

    const user = await User.findOne({_id: uid});
    const friends = await User.find({_id: {$in: user.friends}});

    if(query === ''){
        return [];
    }

    let result = [];
    let seen = {};

    recipients.forEach(user => {
        seen[user._id] = true
    });

    for(let i=0, j=0;i<friends.length && j<12; i++){
        let friendFirstName = friends[i].firstName.split(" ").join("").toLowerCase();
        let friendLastName = friends[i].lastName.split(" ").join("").toLowerCase();

        if((friendFirstName + friendLastName).startsWith(query) && !seen[friends[i]._id]){
            seen[friends[i]._id]= true;
            
            result.push(friends[i]);
            
            j++;
        }
    }

    //remember to refactor this section
    if(result.length < 12){
        const users = await User.find({});

        for(let i=0, j=0;i<users.length && j<12;i++){
            let userFirstName = users[i].firstName.split(" ").join("").toLowerCase();
            let userLastName = users[i].lastName.split(" ").join("").toLowerCase();

            if((userFirstName+userLastName).startsWith(query) && !seen[users[i]._id]){
                result.push(users[i]);
                j++;
            }
        }
    }
    //this section between the 2 comments
    res.json(result);
}