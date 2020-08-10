import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

//actions 
import {
    setUserChats, 
    updateRecipients, 
    clearComposer,
    setMsgsOnDisplay,
    setDisplayedChatId
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
    async componentDidMount(){
        const {uid, setUserChats} = this.props;

        const response = await axios.get(`http://localhost:5000/chats/user/${uid}`);
        const chats = response.data;

        setUserChats(chats);

        if(chats.length !== 0){
            this.props.history.push(chats[0]._id);
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
            setMsgsOnDisplay,
            setDisplayedChatId,
            updateRecipients, 
            clearComposer
        } = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        const chatId = this.props.match.params.id;

        const messageCards = chats.map(() =>
            <MessageCard/>    
        );

        return(
            <div className='messages'>
                <div className='container-fluid'>
                    <div className='row no-gutters'>
                        <div className ='col-4'>
                            <div className ='card-list-header'>
                                <h3>Chats</h3>
                                
                                {chatId ==='new'?
                                    (<i className = 'fas fa-times'/>)
                                    : (<i className ='fas fa-paper-plane'/>)
                                }
                            </div>
 
                            <div className ='card-list'>
                                <SearchContacts/>

                                {messageCards.length === 0?
                                    <h3 className='no-cards'>No messages available</h3>:
                                    messageCards
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
        displayedChatId: state.messages.displayedChatId
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        setUserChats: (chats) => {dispatch(setUserChats(chats))},
        updateRecipients: (recipients) => {dispatch(updateRecipients(recipients));},
        clearComposer: () => {dispatch(clearComposer());},
        setMsgsOnDisplay: (chatId) => {dispatch(setMsgsOnDisplay(chatId));},
        setDisplayedChatId: (chatId) => {dispatch(setDisplayedChatId(chatId));}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessagesHome));