const {User, Message, Chat} = require('../dbschemas');

exports.getRecipients = async (data) =>{
    const {uid, name, isSelected} = data;

    let query = name.split(" ").join("").toLowerCase();

    const user = await User.findOne({_id: uid});
    const friends = await User.find({_id: {$in: user.friends}});

    if(friends.length === 0 || query === ''){
        return [];
    }

    let result = [];
    let seen = {...isSelected};

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
    const {uid, recipients, content} = data;

    const members = recipients.map(user =>
        user._id
    );

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

    return members;
}