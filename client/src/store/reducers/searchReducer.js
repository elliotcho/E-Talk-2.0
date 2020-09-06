import * as types from '../constants/actionTypes';

const initState = {
    query: null,
    results: []
}

const searchReducer = (state = initState, action) =>{
    switch(action.type){
        case types.SAVE_QUERY:
            return {
                ...state,
                query: action.query
            }
        case types.SEARCH_APPLIED:
            return{
                ...state,
                results: [...action.results]
            }
        case types.PROFILE_QUERY:
            return{
                ...state,
                results: [],
                query: action.query
            }
        case types.CLEAR_QUERY:    
            return{
                ...state,
                results: [],
                query: ''
            }
        default:
            return state;
    }
}

export default searchReducer;