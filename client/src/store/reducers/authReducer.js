const initState = {uid: null || window.localStorage.getItem('uid')}

const authReducer = (state = initState, action) =>{
    switch(action.type){
        case "LOGIN_SUCCESS":
            window.localStorage.setItem('uid', action.uid);

            return {
                ...state,
                uid: action.uid
            }
        default:
            return state;
    }
}

export default authReducer;