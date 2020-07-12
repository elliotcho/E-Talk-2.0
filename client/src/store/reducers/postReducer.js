const initState = {list: []};

const postReducer = (state=initState, action) =>{
    switch(action.type){
        case "POST_CREATED":
            return{
                ...state,
                list: [...action.posts]
            }
        case "POSTS_LOADED":
            return{
                ...state,
                list: action.posts
            }
        case "POST_DELETED":
            return{
                ...state,
                list: [...action.posts]
            }
        default:
            return state;
    }
}

export default postReducer;