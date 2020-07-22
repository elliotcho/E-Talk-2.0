import axios from 'axios';

export const saveQuery = (query) =>{
    return (dispatch) =>{
        dispatch({type: 'SAVE_QUERY', query});
    }
}

export const changeQueryToProfile = (profileId) =>{
    return (dispatch) =>{
        axios.get(`http://localhost:5000/users/${profileId}`).then(response =>{
            const {
                firstName, 
                lastName
            } = response.data;
            
            dispatch({type: "PROFILE_QUERY", query: `${firstName} ${lastName}`});
        });
    }
}

export const clearQuery = () =>{
    return (dispatch) =>{
        dispatch({type: 'CLEAR_QUERY', query: ""});
    }
}