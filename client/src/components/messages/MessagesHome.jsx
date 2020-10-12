import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as msgActions from '../../store/actions/messagesActions';
import SearchContacts from './SearchContacts';
import Conversation from './convo/Conversation';
import CreateMessage from './CreateMessage';
import Composer from './Composer';
import MessageCard from './MessageCard';
import axios from 'axios';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Messages.css';

class MessagesHome extends Component{
    constructor(){
        super();

        this.state = {
            emptyContactsQuery: false
        };

        this.cancelSource = axios.CancelToken.source();
        this.handleComposer = this.handleComposer.bind(this);
        this.clearContactsQuery = this.clearContactsQuery.bind(this);
        this.resetContactsQuery = this.resetContactsQuery.bind(this);
    }

    async componentDidMount(){
        const chatId = this.props.match.params.id;

        const {uid,  dispatch} = this.props;
        const {getUserChats, seeChats} = msgActions;

        const chats = await dispatch(getUserChats(uid, this.cancelSource));
        dispatch(seeChats(uid));

        if(chatId === 'home'){
            this.props.history.push(`/chat/${chats[0]._id}`);
        }

        else if(chats.length === 0){
            this.props.history.push('/chat/new');
        }
    }

    componentDidUpdate(prevProps){
        const prevPathName = prevProps.location.pathname;
        const currPathName = this.props.location.pathname;

        const {uid, unseenChats, dispatch} = this.props;
        const {seeChats} = msgActions;

        if(prevPathName !== '/chat/home' && currPathName === '/chat/home'){
            this.props.history.push(prevPathName);
        }

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
            const exitComposer = () => this.props.history.goBack();

            if(chats.length === 0){
                return;
            }

            if(recipients.length !== 0){
                confirmAlert({
                    title: 'E-Talk',
                    message: 'Are you sure you want to exit?',
                    buttons: [
                        {label: 'Yes', onClick: exitComposer},
                        {label: 'No', onClick: () => {return;}}
                    ]
                });
            }


            else{
                exitComposer();
            }
        }
    }

    clearContactsQuery(){
        this.setState({emptyContactsQuery: true});
    }

    resetContactsQuery(){
        this.setState({emptyContactsQuery: false});
    }

    componentWillUnmount(){
        const {dispatch} = this.props;
        const {clearChats} = msgActions;

        dispatch(clearChats());

        this.cancelSource.cancel();
    }

    render(){
        const chatId = this.props.match.params.id;

        const {emptyContactsQuery} = this.state;
        const {uid, chats, recipients, typingMsgs,composerResults, composerChatId, dispatch} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        const clearContactsQuery = () => {this.setState({emptyContactsQuery: true})};
        const resetContactsQuery = () => {this.setState({emptyContactsQuery: false})};

        const cards = chats.map(chat =>
            <MessageCard 
                key={chat._id} 
                chatId = {chat._id}
                uid={uid}
                dispatch = {dispatch}
                isActive = {chat._id === chatId}
                messages = {chat.messages}
                timeOfLastMessage = {chat.timeOfLastMessage}
                clearContactsQuery =  {clearContactsQuery}
                getUserChats = {msgActions.getUserChats}
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
                                <SearchContacts 
                                    uid={uid} 
                                    emptyContactsQuery = {emptyContactsQuery}
                                    resetContactsQuery = {resetContactsQuery}
                                    dispatch={dispatch}
                                />

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
                                cancelSource = {this.cancelSource}
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