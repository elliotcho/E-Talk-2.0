export const getUsersComposedTo = (queryResult) =>{
    return (dispatch) =>{
        dispatch({type:'GET_USERS_COMPOSED_TO', composedTo: queryResult});
    }
}

export const clearUsersComposedTo = () =>{
    return (dispatch) =>{
        dispatch({type: 'CLEAR_USERS_COMPOSED_TO'});
    }
}