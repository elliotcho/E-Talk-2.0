import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import loading from '../../images/loading.jpg';

class MessageCard extends Component{
    constructor(){
        super();

        this.state = {
            memberNames: 'Loading...',
            isRead: true
        }

        this.getCardInfo = this.getCardInfo.bind(this);
        this.formatContent = this.formatContent.bind(this);
        this.displayChat = this.displayChat.bind(this);
    }

    async componentDidMount(){
        await this.getCardInfo();
    }

    async componentDidUpdate(){
        const {uid, isActive} = this.props;

        const {messages} = this.props;
        const n = messages.length;

        if(isActive && !messages[n-1].readBy.includes(uid)){
            await this.getCardInfo();
        }
    }

    async getCardInfo(){
        const {uid, chatId, isActive} = this.props;

        const {messages} = this.props;
        const n = messages.length;

        //check if the last message in the chat has been read or if the chat is rendering
        const isRead = messages[n-1].readBy.includes(uid) || isActive;

        //config for post requests
        const config = {headers: {'content-type': 'application/json'}};

        if(isActive){
            await axios.post('http://localhost:5000/chats/messages/read', {uid, chatId}, config);
        }

        //get member names
        const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
        const memberNames = response.data.memberNames;

        this.setState({
            memberNames,
            isRead
        });
    }

    formatContent(){
        const {messages} = this.props;
        const n = messages.length;

        const content = messages[n-1].content;

        if(content.length > 20){
            return content.substring(0, 20) + '...';
        }

        return content;
    }

    displayChat(){
        const {chatId} = this.props;
        this.props.history.push(`/chat/${chatId}`);
    }

    render(){
        const {memberNames, isRead} = this.state;

        const {timeOfLastMessage, isActive} = this.props;

        const active = (isActive) ? 'active': '';

        return(
            <div className ={`msg-card card ${active} flex-row flex-wrap`} onClick={this.displayChat}>         
                    <div className ='card-header border-0'>
                        <img src={loading} alt='profile-pic'/>
                    </div>
                      
                   <div className ='card-block'>
                        <h3>{memberNames}</h3>
                        
                        <p>
                            {
                                isRead? 
                                this.formatContent()
                               :(<strong className ='text-dark'>
                                   {this.formatContent()}
                                </strong>)
                            }
                        </p>
                        
                        <p className='text-muted'>{moment(timeOfLastMessage).calendar()}</p>
                   </div>
            </div>
        )
    }
}

export default withRouter(MessageCard);