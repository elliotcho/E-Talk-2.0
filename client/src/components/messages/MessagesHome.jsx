import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

//actions 
import {
    setUserChats, 
    updateRecipients, 
    clearComposer,
    setMsgsOnDisplay,
    setDisplayedChatId,
    seeChats,
    readChat
} from '../../store/actions/messagesActions';

//components
import SearchContacts from './SearchContacts';
import Conversation from './Conversation';
import CreateMessage from './CreateMessage';
import Composer from './Composer';
import MessageCard from './MessageCard';

import axios from 'axios';
import './Messages.css';

class MessagesHome extends Component{
    constructor(){
        super();
        this.handleComposer = this.handleComposer.bind(this);
    }

    async componentDidMount(){
        const {uid, setUserChats, seeChats} = this.props;

        const response = await axios.get(`http://localhost:5000/chats/user/${uid}`);
        const chats = response.data;

        //get all chats and update the global state
        setUserChats(chats);

        //mark all chats as seen
        seeChats(uid);

        //the chat id in the route parameter
        const chatId = this.props.match.params.id;

        if(chats.length !== 0 && chatId === 'new'){
            this.props.history.push(chats[0]._id);
        }
    }

    componentDidUpdate(){
        const {uid, unseenChats, seeChats} = this.props;

        if(unseenChats > 0){
            seeChats(uid);
        }
    }

    handleComposer(){
        const {id} = this.props.match.params;

        const {chats, recipients} = this.props;

        let msg = "You haven't finished composing your message? Are you sure you want to exit?";

        if(id === 'new'){
            if(chats.length === 0 || (recipients.length!==0 && !window.confirm(msg))){
                return;
            }

            this.props.history.push(`/chat/${chats[0]._id}`);
        }

        else{
            this.props.history.push('/chat/new');
        }
    }

    render(){
        const {
            uid, 
            chats, 
            recipients, 
            composerResults,
            displayedChatId,
            msgsOnDisplay,
            setUserChats,
            readChat,
            setMsgsOnDisplay,
            setDisplayedChatId,
            updateRecipients, 
            clearComposer
        } = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        const chatId = this.props.match.params.id;

        const messageCards = chats.map(chat =>
            <MessageCard 
                key={chat._id} 
                chatId = {chat._id}
                isActive = {chat._id === chatId}
                uid={uid}
                messages = {chat.messages}
                timeOfLastMessage = {chat.timeOfLastMessage}
                readChat = {() => {readChat(chats, chatId, uid)}}
            />    
        );

        return(
            <div className='messages'>
                <div className='container-fluid'>
                    <div className='row no-gutters'>
                        <div className ='col-4'>
                            <div className ='cards-container-header'>
                                <h3>Chats</h3>
                                
                                {chatId ==='new'?
                                    (<i className = 'fas fa-times' onClick = {this.handleComposer}/>)
                                    : (<i className ='fas fa-paper-plane' onClick = {this.handleComposer}/>)
                                }
                            </div>
 
                            <div className ='cards-container'>
                                <SearchContacts/>

                                {messageCards.length === 0?
                                    <h3 className='no-cards'>No messages available</h3>:
                                    <div className='cards-list'>{messageCards}</div>
                                }
                            </div>
                        </div>

                        <div className='col-8'>
                            {
                                chatId === 'new'?  
                                (<Composer 
                                    uid = {uid}
                                    recipients= {recipients} 
                                    composerResults= {composerResults}
                                    updateRecipients = {updateRecipients}
                                    clearComposer = {clearComposer}
                                />) 
                                :(<Conversation 
                                    uid = {uid}
                                    chatId = {chatId}
                                    displayedChatId = {displayedChatId}
                                    msgsOnDisplay = {msgsOnDisplay}
                                    setDisplayedChatId = {setDisplayedChatId}
                                    setMsgsOnDisplay = {setMsgsOnDisplay}
                                />)
                            }

                            <CreateMessage 
                                uid ={uid}
                                recipients = {recipients}
                                chatId = {chatId}
                                setUserChats = {setUserChats}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        chats: state.messages.chats,
        recipients: state.messages.recipients,
        composerResults: state.messages.composerResults,
        msgsOnDisplay: state.messages.msgsOnDisplay,
        displayedChatId: state.messages.displayedChatId,
        unseenChats: state.messages.unseenChats
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        setUserChats: (chats) => {dispatch(setUserChats(chats))},
        updateRecipients: (recipients) => {dispatch(updateRecipients(recipients));},
        clearComposer: () => {dispatch(clearComposer());},
        setMsgsOnDisplay: (chatId, uid) => {dispatch(setMsgsOnDisplay(chatId, uid));},
        setDisplayedChatId: (chatId) => {dispatch(setDisplayedChatId(chatId));},
        seeChats: (uid) => {dispatch(seeChats(uid));},
        readChat: (chats, chatId, uid) => {dispatch(readChat(chats, chatId, uid));}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessagesHome));