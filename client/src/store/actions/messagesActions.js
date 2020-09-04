import * as types from '../constants/actionTypes';
import axios from 'axios';

const config = {headers: {'content-type': 'application/json'}};

export const setComposerResults = (uid, name, recipients) =>{
    return async (dispatch) =>{
        let composerResults = [];

        if(name){
            const data = {uid, name, recipients};

            const response = await axios.post('http://localhost:5000/chats/composer', data , config);
            composerResults = response.data;
        }

        dispatch({
            type: types.LOAD_COMPOSER_RESULTS, 
            composerResults
        });
    }
}

export const updateRecipients = (recipients) =>{
    return(dispatch) =>{
        dispatch({
            type: types.UPDATE_RECIPIENTS, 
            recipients
        });
    }
}

export const checkIfChatExists = async (members) =>{
    const response = await axios.post('http://localhost:5000/chats/exists', {members}, config);
    const {chat} = response.data;
    return chat._id;
}

export const renderComposerChat = (chatId) =>{
    return (dispatch) =>{
        dispatch({
            type: types.RENDER_COMPOSER_CHAT, 
            chatId
        });
    }
}

export const clearComposerChat = () =>{
    return (dispatch) =>{
        dispatch({type: types.CLEAR_COMPOSER_CHAT});
    }
}

export const clearComposer = () =>{
    return (dispatch) =>{
        dispatch({type: types.CLEAR_COMPOSER});
    }
}

export const getMemberNames = async (chatId, uid) => {
    const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
    let {memberNames} = response.data;
 
    return memberNames;
 }

export const getChatPics = async (chatId, uid, getProfilePic) => {
    const response = await axios.post('http://localhost:5000/chats/memberids', {uid, chatId}, config);
    const {members} = response.data;
   
    let chatPics = [];

    for(let i=0;i<members.length;i++){
        const imgURL = await getProfilePic(members[i]);
        chatPics.push(imgURL);
    }

    return chatPics;
}

export const readChat = (chatId, uid, msgs, isActive) =>{
    return async (dispatch, getState) => {
        if(isActive){
            await axios.post('http://localhost:5000/chats/messages/read', {uid, chatId}, config);    
            
            const state = getState();
            const {chats} = state.messages;

            for(let i=0;i<chats.length;i++){
                if(chats[i]._id === chatId){
                    const {messages} = chats[i];
                    const n = messages.length;

                    messages[n-1].readBy.push(uid);
            
                    break;
                }
            }

            dispatch({
                type: types.READ_CHAT, 
                chats
            });
        }

        const n = msgs.length;
        return msgs[n-1].readBy.includes(uid);
    }
}

export const getUserChats = (uid, cancelSource = null) => {
    return async (dispatch) => {
        const route = `http://localhost:5000/chats/user/${uid}`;

        const response = (cancelSource)? 
            await axios.get(route, {cancelToken: cancelSource.token}):
            await axios.get(route);
        
        const chats = response.data;

        dispatch({
            type: types.LOAD_CHATS, 
            chats
        });
    
        return chats;
    }
}

export const seeChats = (uid) =>{
    return async (dispatch) =>{
        await axios.put(`http://localhost:5000/chats/see/${uid}`);
        dispatch({type: types.SEE_CHATS});
    }
}

export const clearChats = () => {
    return (dispatch) => {
        dispatch({type: types.CLEAR_CHATS});
    }
}

export const getUnseenChats = (uid) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/chats/unseen/${uid}`);
        const unseenChats= response.data.unseenChats;

        dispatch({
            type: types.LOAD_UNSEEN_CHATS, 
            unseenChats
        });
    }
}

export const createChat = async (uid, recipients, content) => {
    const data = {uid, recipients, content};

    const response = await axios.post('http://localhost:5000/chats/create', data, config);
    const {chatId} = response.data;

    return chatId;
}

export const sendMessage = async (chatId, uid, content) => {
    const data = {uid, chatId, content};

    const response = await axios.post('http://localhost:5000/chats/message', data, config);
    const newMessage = response.data;

    return newMessage;
}

export const getMemberIds = async (chatId, uid) =>{
    const data = {uid, chatId};

    const response = await axios.post('http://localhost:5000/chats/memberids', data, config);
    return response.data.members;
}

export const handleTyping = (chatId, typingId) =>{
    return async (dispatch, getState) =>{
        const state = getState();
        const {displayedChatId, typingMsgs} = state.messages;

        if(chatId === displayedChatId && !typingMsgs.includes(typingId)){
            dispatch({
                type: types.IS_TYPING,
                typingId
            });
        }
    }
}

export const stopTyping = (chatId, typingMsgs) =>{
    return (dispatch, getState) =>{
        const state = getState();
        const {displayedChatId} = state.messages;

        if(displayedChatId === chatId){
            dispatch({
                type: types.STOP_TYPING,
                typingMsgs
            });
        }
    }
}

export const clearTyping = () =>{
    return (dispatch) =>{
        dispatch({type: types.CLEAR_TYPING});
    }
}




export const renderNewMessage = (chatId, newMessage) => {
    return (dispatch, getState) => {
        const state = getState();

        const {displayedChatId, composerChatId} = state.messages;

        if(displayedChatId === chatId || composerChatId === chatId){
            dispatch({
                type: 'NEW_MESSAGE', 
                newMessage
            });
        }
    }
}

export const setDisplayedChatId = (chatId) =>{
    return (dispatch) =>{ 
        dispatch({type: 'SET_CHAT_ID', chatId});
    }
}

export const setMsgsOnDisplay = (chatId, uid, io) =>{
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:5000/chats/messages/${chatId}`);
        const messages = response.data;
       
        // for(let i=0;i<messages.length;i++){
        //     if(messages[i].readBy.includes(uid)){
        //         continue;
        //     }

        //     messages[i].readBy.push(uid);
        // }

        // const members = await getMemberIds(chatId);

        // io.emit('READ_RECEIPTS', {
        //     chatId,
        //     members,
        //     uid
        // });

        dispatch({type: 'DISPLAY_MESSAGES', messages});
    }
}

export const handleNewMessage = (newMessage, chatId, uid, io) =>{
    return async (dispatch, getState) => {
        const state = getState();

        const {displayedChatId} = state.messages;

        if(displayedChatId === chatId){
            if(!newMessage.readBy.includes(uid)){
                newMessage.readBy.push(uid);
            }

            
            // const members = await getMemberIds(chatId);

            // io.emit('READ_RECEIPTS', {
            //     chatId,
            //     members,
            //     uid
            // });

            dispatch({
                type: 'NEW_MESSAGE', 
                newMessage
            });
        }
    }
}

export const handleReadReceipts = (chatId, readerId, io) =>{
    return async (dispatch, getState) =>{
        const state =getState();

        const {displayedChatId, msgsOnDisplay} = state.messages;
        const {uid} = state.auth;

        if(chatId === displayedChatId){
            for(let i=0;i<msgsOnDisplay.length;i++){
                if(msgsOnDisplay[i].readBy.includes(readerId)){
                    continue;
                }

                msgsOnDisplay[i].readBy.push(readerId);
            }

            // const members = await getMemberIds(chatId);

            // io.emit('READ_RECEIPTS', {
            //     chatId,
            //     members,
            //     uid
            // });

            dispatch({
                type: 'READ_RECEIPTS', 
                msgsOnDisplay
            });
        }
    }
}


export const getReadReceipts = async (readBy, uid, getProfilePic) => {
    const readReceipts = [];

    for(let i=0;i<readBy.length;i++){
        if(readBy[i] === uid){
            continue;
        }

        const imgURL = await getProfilePic(readBy[i]);

        readReceipts.push(imgURL);
    }

    return readReceipts;
}

export const clearChatOnDisplay = () => {
    return (dispatch) =>{
        dispatch({type: 'CLEAR_DISPLAYED_CHAT'});
    }
}