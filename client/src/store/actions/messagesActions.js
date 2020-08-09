import axios from 'axios';

export const getUsersComposedTo = (queryResult) =>{
    return (dispatch) =>{
        dispatch({type:'GET_USERS_COMPOSED_TO', composedTo: queryResult});
    }
}

export const clearComposer= () =>{
    return (dispatch) =>{
        dispatch({type: 'CLEAR_COMPOSER'});
    }
}

export const addRecipient = (userinfo, recipients, isSelected) =>{
    return (dispatch) =>{
        recipients.push(userinfo);

        isSelected[userinfo._id] = true;

        dispatch({
            type: 'UPDATE_RECIPIENTS',
            recipients, 
            isSelected
        });
    }
}

export const removeRecipient = (recipients, isSelected) => {
    return (dispatch) =>{
        const user = recipients.pop();

        delete isSelected[user._id];

        dispatch({
            type: 'UPDATE_RECIPIENTS',
            recipients, 
            isSelected
        })
    }
}

export const loadChats = (chats) =>{
    return (dispatch) =>{
        dispatch({type: 'LOAD_CHATS', chats});
    }
}

export const clearChats = () =>{
    return (dispatch) =>{
        dispatch({type: 'CLEAR_CHATS'});
    }
}

export const getUnseenChats = (uid) =>{
    return (dispatch) =>{
        axios.get(`http://localhost:5000/chats/unseen/${uid}`).then(response =>{
            dispatch({type: 'LOAD_UNSEEN_CHATS', unseenChats: response.data.unseenChats});
        });
    }
}

export const seeChats = (uid) => {
    return (dispatch) =>{
        axios.put(`http://localhost:5000/chats/see/${uid}`).then(() =>{
            dispatch({type: 'SEE_CHATS'});
        });
    }
}

export const readChat = (uid, chatId) =>{
    return (dispatch) =>{
        const config = {headers:{'content-type': 'application/json'}};

        axios.post('http://localhost:5000/chats/read', {uid, chatId}, config).then(response =>{
            dispatch({type: 'LOAD_CHATS', chats: response.data});
        });
    }
}

export const sendMsg = () =>{
    return (dispatch) =>{
        dispatch({type: 'SEND_MSG'});
    }
}