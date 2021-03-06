import authReducer from './authReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import searchReducer from './searchReducer';
import friendsReducer from './friendsReducer';
import notificationReducer from './notificationReducer';
import messagesReducer from './messagesReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    posts: postReducer,
    search: searchReducer,
    friends: friendsReducer,
    notifs: notificationReducer,
    messages: messagesReducer
});

export default rootReducer;