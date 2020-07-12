const initState = {list: []};

const postReducer = (state=initState, action) =>{
    switch(action.type){
        case "POSTS_UPDATED":
            return{
                ...state,
                list: [...action.posts]
            }
        default:
            return state;
    }
}

export default postReducer;