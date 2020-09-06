const initState = {
    initials: null
};

const profileReducer = (state=initState, action) => {
    switch(action.type){
        case "NAVBAR_INITIALS":
            return {
                ...state,
                initials: action.initials
            }
        default:
            return state;
    }
}

export default profileReducer;