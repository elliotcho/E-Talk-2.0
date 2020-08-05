export const getUsersComposedTo = (queryResult) =>{
    return (dispatch) =>{
        dispatch({type:'GET_USERS_COMPOSED_TO', composedTo: queryResult});
    }
}