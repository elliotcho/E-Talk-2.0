import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadChats, seeChats, readChat, clearChats, sendMsg} from '../../store/actions/messagesActions';
import axios from 'axios';
import MessageCard from './MessageCard';
import SearchContacts from './SearchContacts';
import Conversation from './Conversation';
import CreateMessage from './CreateMessage';
import Composer from './Composer';
import './Messages.css';

class MessagesHome extends Component{
    constructor(){
        super();
        this.updateChats = this.updateChats.bind(this);
        this.handleComposer = this.handleComposer.bind(this);
    }

    componentDidMount(){
        const {uid, seeChats} = this.props;

        seeChats(uid);

        this.updateChats();
    }

    async updateChats(){
        const {
            uid, 
            loadChats
        } = this.props;

        const response = await axios.get(`http://localhost:5000/chats/user/${uid}`);
        const chats = response.data;

        loadChats(chats);

        if(chats.length !== 0){
            this.props.history.push(`/chat/${chats[0]._id}`);
        }
    }

    handleComposer(){
        const {id} = this.props.match.params;

        const {recipients, chats} = this.props;

        let msg = "You haven't finished composing your message? Are you sure you want to exit?";

        if(id === 'new'){
            //if we have no chats we do not exit the composer
            if(chats.length === 0){return;}

            //if we have saved recipients but we want to exit composer confirm with user
            if(recipients.length !==0 && !window.confirm(msg)){return;}

            //render the chat with the most recently sent message
            this.props.history.push(`/chat/${chats[0]._id}`);
        }

        else{
            this.props.history.push('/chat/new');
        }
    }

    componentWillUnmount(){
        this.props.clearChats();
    }

    render(){
        const {uid, chats, readChat, newMsg, sendMsg} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        const chatId = this.props.match.params.id;

        const messageCards = chats.map(chat=>
            <MessageCard 
                key={chat._id} 
                chat={JSON.stringify(chat)} 
                activeChatId={chatId}
                uid = {uid}
            />
        );

        return(
            <div className='messages'>
                <div className='container-fluid'>
                    <div className='row no-gutters'>
                        <div className ='col-4'>
                            <div className ='card-list-header'>
                                <h3>Chats</h3>
                                
                                {chatId ==='new'?
                                    (<i className = 'fas fa-times' onClick = {this.handleComposer}/>)
                                    : (<i className ='fas fa-paper-plane' onClick = {this.handleComposer}/>)
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
                                (<Composer uid={uid}/>): 
                                (<Conversation 
                                        chatId={chatId} 
                                        uid={uid} 
                                        readChat = {readChat}
                                        newMsg = {newMsg}
                                />)
                            }

                            <CreateMessage 
                                chatId={chatId} 
                                updateChats={this.updateChats}
                                sendMsg = {sendMsg}
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
        recipients: state.messages.recipients,
        chats: state.messages.chats,
        newMsg: state.messages.newMsg
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        loadChats: (chats) => {dispatch(loadChats(chats));},
        clearChats: () => {dispatch(clearChats());},
        seeChats: (uid) => {dispatch(seeChats(uid));},
        readChat: (uid, chatId) => {dispatch(readChat(uid, chatId));},
        sendMsg: () => {dispatch(sendMsg());}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessagesHome));