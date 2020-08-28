const initState = {
    firstName: null, 
    lastName: null
};

const profileReducer = (state=initState, action) => {
    switch(action.type){
        case "USER_INFO":
            return {
                ...state,
                firstName: action.firstName,
                lastName: action.lastName
            }

        default:
            return state;
    }
}

export default profileReducer;