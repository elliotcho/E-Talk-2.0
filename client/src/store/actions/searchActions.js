import * as types from '../constants/actionTypes';
import axios from 'axios';

export const saveQuery = (query) =>{
    return (dispatch) =>{
        dispatch({
            type: types.SAVE_QUERY, 
            query
        });
    }
}

export const applySearch = (query, uid) =>{
    return async (dispatch) =>{
        const config = {headers: {'content-type': 'application/json'}};

        const response = await axios.post('http://localhost:5000/users/search', {query, uid}, config);
        const results = response.data;

        dispatch({
            type: types.SEARCH_APPLIED, 
            results
        });
    }
}

export const changeQueryToProfile = (profileId) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/users/${profileId}`);
        const {firstName, lastName} = response.data;

        dispatch({
            type: types.PROFILE_QUERY, 
            query: `${firstName} ${lastName}`
        });
    }
}

export const clearQuery = () =>{
    return (dispatch) =>{
        dispatch({type: types.CLEAR_QUERY});
    }
}