import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {io} from '../../App';

class CreateMessage extends Component{
    constructor(){
        super();
        this.pressEnter = this.pressEnter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    pressEnter(e){
        if(e.keyCode === 13 && e.shiftKey === false){
            e.preventDefault();
            this.myMessageForm.dispatchEvent(new Event('submit'));
        }

        else{
           setTimeout(() =>{
            this.myMessage.style.height = "";
            this.myMessage.style.height = this.myMessage.scrollHeight + 'px';
           }, 0);
        }

        if(this.myMessage.scrollHeight > 200){
            this.myMessage.style.overflow = 'auto';
        }

        else{
            this.myMessage.style.overflow = 'hidden';
        }
    }

    handleSubmit(e){
        e.preventDefault();

        const {uid, recipients, chatId, updateChats} = this.props;

        const content = this.myMessage.value;

        if((recipients.length === 0 && chatId === 'new') || content.trim() === ""){
            return;
        }

        this.myMessage.value = "";

        const config = {headers: {'content-type': 'application/json'}};

        if(chatId === 'new'){
            axios.post('http://localhost:5000/chats/create', {uid, recipients, content}, config).then(response =>{
                const {members}= response.data;

                io.emit(
                    'SEND_MESSAGE', 
                    {uid, members, content}
                );

                updateChats();
            });
        }

        else{
           axios.post('http://localhost:5000/chats/message', {uid, chatId, content}, config).then(response =>{
                const {members} = response.data;

                io.emit(
                    'SEND_MESSAGE',
                    {uid, members, content}
                );

                updateChats();
           });
        }
    }

    render(){
        return(
            <div className ='create-msg'>
                <form ref = {ele => this.myMessageForm = ele} onSubmit={this.handleSubmit}>
                    <textarea
                        className ='form-control'
                        rows ='1'
                        ref = {ele =>this.myMessage = ele}
                        placeholder ='Type a message...'
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

const mapStateToProps = (state) =>{
    return {
        uid: state.auth.uid, 
        recipients: state.messages.recipients
    }
}

export default withRouter(connect(mapStateToProps)(CreateMessage));