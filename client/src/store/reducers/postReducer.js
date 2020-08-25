const initState = {posts: []};

const postReducer = (state=initState, action) =>{
    switch(action.type){
        case 'LOAD_POSTS':
            return{
                ...state,
                posts: [...action.posts]
            }
        case 'CREATE_POST':
            return{
                ...state,
                posts: [action.newPost, ...state.posts]
            }
        case 'DELETE_POST':
            const {posts} = state;

            for(let i=0;i<posts.length;i++){
                if(posts[i]._id === action.postId){
                    posts.splice(i, 1);
                    break;
                }
            }

            return {...state, posts: [...posts]}
        default:
            return state;
    }
}

export default postReducer;