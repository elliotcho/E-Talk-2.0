import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as msgActions from '../../store/actions/messagesActions';
import {io} from '../../App';

let intervals = [];

class CreateMessage extends Component{
    constructor(){
        super();
        this.pressEnter = this.pressEnter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNewChat = this.handleNewChat.bind(this);
        this.handleExistingChat = this.handleExistingChat.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleIsTyping = this.handleIsTyping.bind(this);
        this.handleStopTyping = this.handleStopTyping.bind(this);
    }

    async componentDidUpdate(prevProps){
        const {chatId, composerChatId} = this.props;

        if(prevProps.chatId !== chatId || prevProps.composerChatId !== composerChatId){
            if(prevProps.composerChatId){
                await this.handleStopTyping(prevProps.composerChatId);
            }

            else{
                await this.handleStopTyping(prevProps.chatId);
            }
        }
    }

    pressEnter(e){
        //user doesn't press shift enter
        if(e.keyCode === 13 && e.shiftKey === false){
            e.preventDefault();
            this.myMessageForm.dispatchEvent(new Event('submit'));
        }

        //user presses shift enter
        else{
            setTimeout(()=>{
                this.myMessage.style.height = "";
                this.myMessage.style.height = this.myMessage.scrollHeight + 'px';
            }, 0);
        }

        //adjust overflow based on scroll height
        if(this.myMessage.scrollHeight > 200){
            this.myMessage.style.overflow = 'auto';
        }

        else{
            this.myMessage.style.overflow = 'hidden';
        }
    }

    async handleSubmit(e){
        e.preventDefault();

        const {chatId, composerChatId, recipients} = this.props; 
        const content = this.myMessage.value;
    
        if(content.trim() === ""){
            return;
        }
     
        else if(chatId === 'new' && !composerChatId){
            if(recipients.length === 0){
                return;
            }

            await this.handleNewChat(content);
        }
        
        else{
            this.handleStopTyping();
            await this.handleExistingChat(content);
        }

        this.myMessage.value="";
    }

    async handleNewChat(content){
        const {uid, dispatch, recipients, cancelSource} = this.props;
        const {createChat, getUserChats} = msgActions;

        const chatId = await createChat(uid, recipients, content);

        /*  update the message cards of recipients
            reshuffle message cards
            render the new chat  */       
        dispatch(getUserChats(uid, cancelSource));
        io.emit('CREATE_CHAT', {recipients}); 
        this.props.history.push(`/chat/${chatId}`);
    }

    async handleExistingChat(content){
        const {uid, chatId, dispatch, composerChatId} = this.props;

        const {
            sendMessage, 
            getUserChats,
            renderNewMessage,
            getMemberIds
        } = msgActions;

        const currChatId = (composerChatId) ? composerChatId: chatId;

        const newMessage = await sendMessage(currChatId, uid, content);
        dispatch(renderNewMessage(currChatId, newMessage, uid));
        dispatch(getUserChats(uid));
       
        const members = await getMemberIds(currChatId, uid);
      
        io.emit('NEW_MESSAGE', {
            chatId: currChatId, 
            members, 
            newMessage
        });

        if(currChatId === composerChatId){
            this.props.history.push(`/chat/${currChatId}`);
        }
    }

    handleChange(e){
        //if the user presses enter
        if(e.target.value.includes('\n')){
            this.myMessage.dispatchEvent(new Event('keydown'))
            return;
        }

        //if the output is blank stop typing
        if(e.target.value === ''){
            this.handleStopTyping();
            return;
        }

        this.handleIsTyping();
    }

    async handleIsTyping(){
        const {chatId, composerChatId, uid, typingMsgs, dispatch} = this.props;
        const {getMemberIds, handleTyping} = msgActions;

        const currChatId = (composerChatId) ? composerChatId: chatId;

        intervals.forEach(interval => clearInterval(interval));
        intervals = [];

        const typingInterval = setInterval(() =>{
            clearInterval(typingInterval);
            this.handleStopTyping();
        }, 10000);

        intervals.push(typingInterval);

        if(!typingMsgs.includes(uid)){
            const members = await getMemberIds(currChatId, uid);

            io.emit('IS_TYPING', {
                chatId: currChatId,
                members: [...members],
                uid
            });

            dispatch(handleTyping(currChatId, uid));
        }
    }

    async handleStopTyping(prevChatId = null){
        const {chatId, composerChatId, typingMsgs, uid} = this.props;
        const {getMemberIds} = msgActions;

        const currChatId = (prevChatId) ? prevChatId: 
                       (composerChatId) ? composerChatId:
                        chatId;

        typingMsgs.splice(typingMsgs.indexOf(uid), 1);

        const members = await getMemberIds(currChatId, uid);
        
        io.emit('STOP_TYPING', {
            chatId: currChatId, 
            members: [...members],
            typingMsgs
        });
    }

    async componentWillUnmount(){
        await this.handleStopTyping();
    }

    render(){
        return(
            <div className ='create-msg'>
                <form ref = {ele => this.myMessageForm = ele} onSubmit = {this.handleSubmit}>
                    <textarea
                        className ='form-control'
                        rows ='1'
                        ref = {ele =>this.myMessage = ele}
                        placeholder ='Type a message...'
                        onChange = {this.handleChange}
                        onKeyDown = {this.pressEnter}
                    />

                    <label htmlFor = 'msgPic'>
                        <i className ='fas fa-file-image'/>
                    </label>

                    <input 
                           type = 'file'
                           id = 'msgPic'
                           accept = 'jpg jpeg png'
                    />
                </form>
            </div>
        )
    }
}

export default withRouter(CreateMessage);