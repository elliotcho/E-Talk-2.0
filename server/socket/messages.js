const {User} = require('../dbschemas');

exports.getContacts = async (data) =>{
    const {uid, name} = data;

    let query = name.split(" ").join("").toLowerCase();

    const user = await User.findOne({_id: uid});
    const friends = await User.find({_id: {$in: user.friends}});

    if(friends.length === 0 || query === ''){
        return [];
    }

    let result = [];

    for(let i=0;i<friends.length; i++){
        let friendFirstName = friends[i].firstName.split(" ").join("").toLowerCase();
        let friendLastName = friends[i].lastName.split(" ").join("").toLowerCase();

        if((friendFirstName + friendLastName).startsWith(query)){
            result.push(friends[i]);
        }
    }

    return result;
}