const initState = {
    query: null,
    results: []
}

const searchReducer = (state = initState, action) =>{
    switch(action.type){
        case "SAVE_QUERY":
            return {
                ...state,
                query: action.query
            }
        case "CLEAR_QUERY":    
            return{
                ...state,
                query: action.query
            }
        case "PROFILE_QUERY":
            return{
                ...state,
                query: action.query
            }
        default:
            return state;
    }
}

export default searchReducer;