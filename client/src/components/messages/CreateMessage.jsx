import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as msgActions from '../../store/actions/messagesActions';
import {io} from '../../App';

let intervals = [];

class CreateMessage extends Component{
    constructor(){
        super();

        this.state = {
            photo: []
        }

        this.pressEnter = this.pressEnter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleIsTyping = this.handleIsTyping.bind(this);
        this.handleStopTyping = this.handleStopTyping.bind(this);
        this.attachPhoto = this.attachPhoto.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
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

        const {
            uid, 
            chatId, 
            composerChatId, 
            recipients, 
            dispatch,
            cancelSource
        } = this.props;
     
        const content = this.myMessage.value;
        const {createChat, getUserChats} = msgActions;

        if(content.trim() === ""){
            return;
        }
     
        else if(chatId === 'new' && !composerChatId){
            if(recipients.length === 0){
                return;
            }

            const chatId = await createChat(uid, recipients, content);
      
            //update the message cards of recipients
            io.emit('CREATE_CHAT', {recipients});

            //reshuffle message cards
            await dispatch(getUserChats(uid, cancelSource));

            //render the new chat
            this.props.history.push(`/chat/${chatId}`);
        }
        
        else{
            this.handleStopTyping();

            const {sendMessage, getMemberIds} = msgActions;

            const currChatId = (composerChatId) ? composerChatId: chatId;

            const newMessage =  await sendMessage(currChatId, uid, content);
            const members = await getMemberIds(currChatId, uid);

            io.emit('SEND_MESSAGE', {
                chatId: currChatId, 
                members: [...members, uid], 
                newMessage
            });
        }

        this.myMessage.value="";
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
        const {chatId, uid, typingMsgs} = this.props;
        const {getMemberIds} = msgActions;

        intervals.forEach(interval => clearInterval(interval));
        intervals = [];

        const typingInterval = setInterval(() =>{
            clearInterval(typingInterval);
            this.handleStopTyping();
        }, 10000);

        intervals.push(typingInterval);

        //check if we are already typing
        let found = false;
        
        for(let i=0;i<typingMsgs.length;i++){
            if(typingMsgs[i].typingId === uid){
                found = true;
                break;
            }
        }

        if(chatId !== 'new' && !found){
            const members = await getMemberIds(chatId, uid);

            io.emit('IS_TYPING', {
                chatId,
                members: [...members, uid],
                uid
            });
        }
    }

    async handleStopTyping(){
        const {typingMsgs, uid, chatId} = this.props;
        const {getMemberIds} = msgActions;


        for(let i =0; i<typingMsgs.length;i++){
            if(typingMsgs[i].typingId === uid){
                typingMsgs.splice(i, 1);
                break;
            }
        }

        const members = await getMemberIds(chatId, uid);
        
        io.emit('STOP_TYPING', {
            chatId, 
            typingMsgs,
            members: [...members, uid]
        });
        
        return;
    }

    attachPhoto(e){
        this.setState({photo: e.target.files});
    }    

    removePhoto(){
        document.getElementById('msgPic').value = "";

        this.setState({
            photo: []
        });
    }

    render(){
        const {photo} = this.state;

        return(
            <div className ='create-msg'>
                {photo.length !== 0?
                    (<div className = 'photo-block text-white d-inline-block'>
                        {photo[0].name}
                        <i className = 'fas fa-times' onClick={this.removePhoto}/>
                    </div>)
                    :null
                }

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

                    <input type = 'file'
                           id = 'msgPic'
                           accept = 'jpg jpeg png'
                           onChange = {this.attachPhoto}
                    />
                </form>
            </div>
        )
    }
}

export default withRouter(CreateMessage);