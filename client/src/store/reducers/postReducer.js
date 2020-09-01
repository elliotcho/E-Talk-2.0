import * as types from '../constants/actionTypes'

const initState = {
    posts: []
};

const postReducer = (state=initState, action) =>{
    switch(action.type){
        case types.LOAD_POSTS:
            return{
                ...state,
                posts: [...action.posts]
            }
        case types.CREATE_POST:
            return{
                ...state,
                posts: [action.newPost, ...state.posts]
            }
        case types.DELETE_POST:
            return{
                ...state,
                posts: [...action.posts]
            }
        default:
            return state;
    }
}

export default postReducer;