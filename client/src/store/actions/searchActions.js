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

export const applySearch = (query, uid) =>{
    return (dispatch) =>{
        const config = {headers: {'content-type': 'application/json'}};

        axios.post('http://localhost:5000/users/search', {query, uid}, config).then(response =>{
            const results = response.data;
            dispatch({type: "SEARCH_APPLIED", results});
        });
    }
}