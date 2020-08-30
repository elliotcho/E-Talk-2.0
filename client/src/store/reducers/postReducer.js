import {
    LOAD_POSTS,
    CREATE_POST,
    DELETE_POST
} from '../constants/actionTypes'

const initState = {
    posts: []
};

const postReducer = (state=initState, action) =>{
    switch(action.type){
        case LOAD_POSTS:
            return{
                ...state,
                posts: [...action.posts]
            }
        case CREATE_POST:
            return{
                ...state,
                posts: [action.newPost, ...state.posts]
            }
        case DELETE_POST:
            return{
                ...state,
                posts: [...action.posts]
            }
        default:
            return state;
    }
}

export default postReducer;