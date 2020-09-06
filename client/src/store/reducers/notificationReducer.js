import * as types from '../constants/actionTypes';

const initState = {
    notifs: [], 
    unreadNotifs: 0
}

const notificationReducer = (state = initState, action) => {
    switch(action.type){
        case types.LOAD_UNREAD_NOTIFS:
            return{
                ...state,
                unreadNotifs: action.unreadNotifs
            }
        case types.READ_NOTIFS:
            return{
                ...state,
                unreadNotifs: 0,
                notifs: [...action.notifs]
            }
        default: 
            return state;
    }
}

export default notificationReducer;