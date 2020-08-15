import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {io} from '../../App';

class CreateMessage extends Component{
    constructor(){
        super();
        this.pressEnter = this.pressEnter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStopTyping = this.handleStopTyping.bind(this);
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

        const {uid, chatId, recipients} = this.props;
        
        const content = this.myMessage.value;

        if(content.trim() === ""){
            return;
        }

        if(chatId === 'new'){
            if(recipients.length === 0){
                return;
            }

            let response = await axios.post('http://localhost:5000/chats/create', {uid, recipients, content});
            const newChatId = response.data.chatId;

            response = await axios.get(`http://localhost:5000/chats/user/${uid}`);
            const chats = response.data;

            //broadcast message
            io.emit('CREATE_CHAT', {uid, chatId: newChatId});

            //update list of message cards
            this.props.setUserChats(chats);

            //render the chat you just created
            this.props.history.push(`/chat/${newChatId}`);
        }
        
        else{
            this.handleStopTyping();
            io.emit('SEND_MESSAGE', {chatId, uid, content});
        }

        this.myMessage.value="";
    }

    handleChange(e){
        const {chatId, uid, typingMsgs} = this.props;

        if(e.target.value.includes('\n')){
            this.myMessage.dispatchEvent(new Event('keydown'))
            return;
        }

        if(e.target.value === ''){
            this.handleStopTyping();
            return;
        }

        let found = false;

        for(let i=0;i<typingMsgs.length;i++){
            if(typingMsgs[i].typingId === uid){
                found = true;
                break;
            }
        }

        if(chatId !== 'new' && !found){
            io.emit('IS_TYPING', {chatId, uid});
        }
    }

    handleStopTyping(){
        const {typingMsgs, uid, chatId} = this.props;

        for(let i =0; i<typingMsgs.length;i++){
            if(typingMsgs[i].typingId === uid){
                typingMsgs.splice(i, 1);
                break;
            }
        }
        
        io.emit('STOP_TYPING', {chatId, typingMsgs});
        
        return;
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

                    <label>
                        <i className ='fas fa-file-image'/>
                    </label>
                </form>
            </div>
        )
    }
}

export default withRouter(CreateMessage);