const {User} = require('../dbschemas');

exports.getContacts = async (data) =>{
    const {uid, name} = data;

    let query = name.trim().toLowerCase();

    const user = await User.findOne({_id: uid});
    const friends = await User.find({_id: {$in: user.friends}});

    if(friends.length === 0){return [];}

    let result = [];

    for(let i=0;i<friends.length; i++){
        let friendFirstName = friends[i].firstName.trim().toLowerCase();
        let friendLastName = friends[i].lastName.trim().toLowerCase();

        if(`${friendFirstName}${friendLastName}`.startsWith(query)){
            result.push(friends[i]);
        }
    }

    return result;
}