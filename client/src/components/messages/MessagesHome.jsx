import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserChats, seeChats} from '../../store/actions/messagesActions';
import SearchContacts from './SearchContacts';
import Conversation from './convo/Conversation';
import CreateMessage from './CreateMessage';
import Composer from './Composer';
import MessageCard from './MessageCard';
import './Messages.css';

class MessagesHome extends Component{
    constructor(){
        super();
        this.handleComposer = this.handleComposer.bind(this);
    }

    async componentDidMount(){
        const chatId = this.props.match.params.id;
        const {uid,  dispatch} = this.props;

        //get user chats and mark them as seen
        const chats = await dispatch(getUserChats(uid));
        dispatch(seeChats(uid));

        if(chats.length === 0 || chatId === 'new'){
            this.props.history.push('/chat/new');
        }

        else{
            this.props.history.push(`/chat/${chats[0]._id}`);
        }
    }

    componentDidUpdate(){
        const {uid, unseenChats, dispatch} = this.props;

        if(unseenChats > 0){
           dispatch(seeChats(uid));
        }
    }

    handleComposer(){
        const {chats, recipients} = this.props;
        
        if(this.props.match.params.id !== 'new'){
            this.props.history.push('/chat/new');
        }

        else{
            const msg = "Are you sure you want to exit?";

            if(chats.length === 0 || (recipients.length!==0 && !window.confirm(msg))){
                return;
            }

            this.props.history.push(`/chat/${chats[0]._id}`);
        }
    }

    render(){
        const chatId = this.props.match.params.id;
        
        const {
            uid, 
            chats, 
            recipients, 
            typingMsgs,
            composerResults, 
            composerChatId, 
            dispatch
        } = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        const cards = chats.map(chat =>
            <MessageCard 
                key={chat._id} 
                chatId = {chat._id}
                uid={uid}
                dispatch = {dispatch}
                isActive = {chat._id === chatId}
                messages = {chat.messages}
                timeOfLastMessage = {chat.timeOfLastMessage}
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
                                    (<i className = 'fas fa-times' onClick = {this.handleComposer}/>): 
                                    (<i className ='fas fa-paper-plane' onClick = {this.handleComposer}/>)
                                }
                            </div>
 
                            <div className ='cards-container'>
                                <SearchContacts/>

                                {cards.length === 0?
                                    (<h3 className='no-cards'>No messages available</h3>):
                                    (<div className='cards-list'>{cards}</div>)
                                }
                            </div>
                        </div>

                        <div className='col-8'>
                            {
                                chatId === 'new'?  
                                (<Composer 
                                    uid = {uid}
                                    dispatch = {dispatch}
                                    recipients= {recipients} 
                                    composerResults= {composerResults}
                                    composerChatId = {composerChatId}
                                />) 
                                :(<Conversation 
                                    chatId = {chatId} 
                                    dispatch = {dispatch}
                                    isComposerChat={false}
                                />)
                            }

                            <CreateMessage 
                                uid ={uid}
                                dispatch = {dispatch}
                                recipients = {recipients}
                                chatId = {chatId}
                                composerChatId = {composerChatId}
                                typingMsgs = {typingMsgs}
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
        uid: state.auth.uid,
        chats: state.messages.chats,
        recipients: state.messages.recipients,
        composerResults: state.messages.composerResults,
        unseenChats: state.messages.unseenChats,
        typingMsgs: state.messages.typingMsgs,
        composerChatId: state.messages.composerChatId
    }
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessagesHome));