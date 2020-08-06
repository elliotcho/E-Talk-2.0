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