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

export const addRecipient = (userinfo, recipients) =>{
    return (dispatch) =>{
        const newRecipients = [...recipients, userinfo];

        dispatch({
            type: 'UPDATE_RECIPIENTS',
            recipients: newRecipients
        });
    }
}

export const removeRecipient = (recipients) => {
    return (dispatch) =>{
        recipients.pop();

        const newRecipients = [...recipients];

        dispatch({
            type: 'UPDATE_RECIPIENTS',
            recipients: newRecipients
        });
    }
}