import React, {Component} from 'react';
import {connect} from 'react-redux';

class CreateMessage extends Component{
    constructor(){
        super();

        this.state = {
            messsageContent: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.pressEnter = this.pressEnter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    pressEnter(e){
        const {value} = e.target;

        if(e.keyCode === 13 && e.shiftKey === false){
            this.setState({
                [e.target.id]: value.substring(0, value.length-1)
            });

            this.myMessageForm.dispatchEvent(new Event('submit'));
        }

        else{
           this.myMessage.style.height = "";
           this.myMessage.style.height = this.myMessage.scrollHeight + 'px';
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

        let {messageContent} = this.state;
        let n = messageContent.length;

        if(messageContent.trim() === ""){
            messageContent = messageContent.substring(0, n-1);
            
            this.setState({messageContent});

            return;
        }
    }

    render(){
        const {messageContent} = this.state;

        return(
            <div className ='create-msg'>
                <form ref = {ele => this.myMessageForm = ele} onSubmit={this.handleSubmit}>
                    <textarea
                        id = 'messageContent'
                        className ='form-control'
                        rows ='1'
                        ref = {ele =>this.myMessage = ele}
                        placeholder ='Type a message...'
                        onKeyUp = {this.pressEnter}
                        onChange = {this.handleChange}
                        value = {messageContent}
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
        isSelected: state.messages.recipients
    }
}

export default connect(mapStateToProps)(CreateMessage);