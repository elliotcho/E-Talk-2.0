const {User, Chat, Message} = require('../dbschemas');

exports.getRecipients = async (data) =>{
    const {uid, name, recipients} = data;

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

    return result;
}

exports.createChat = async (data) =>{
    const {uid, chatId} = data;

    const chat = await Chat.findOne({_id: chatId});
    const n = chat.messages.length;

    return [chat.messages[n-1], chatId, chat.members];
}

exports.sendMessage = async (data) =>{
    const {uid, chatId, content} = data;

    const chat = await Chat.findOne({_id: chatId});

   const newMessage = new Message({
        uid, 
        content, 
        timeSent: new Date(),
        readBy: [uid],
        seenBy: [uid]
    });

    chat.messages.push(newMessage);

    await Chat.updateOne({_id: chatId}, {messages: chat.messages, timeOfLastMessage: new Date()});
 
    return [newMessage, chatId, chat.members];
}