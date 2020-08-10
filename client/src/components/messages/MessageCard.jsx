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
            isRead: false
        }

        this.formatContent = this.formatContent.bind(this);
        this.displayChat = this.displayChat.bind(this);
    }

    async componentDidMount(){
        const {uid, chatId, messages} = this.props;
        const n = messages.length;

        //check if the last message in the chat has been read
        const isRead = messages[n-1].readBy.includes(uid);

        //get member names
        const config = {headers: {'content-type': 'application/json'}};
        const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
        const memberNames = response.data.memberNames;

        this.setState({
            memberNames,
            isRead
        });
    }

    async componentDidUpdate(prevProps){
        const {uid, chatId} = this.props;

        //current props
        const {messages} = this.props;
        const readBy = messages[messages.length-1].readBy;

        //previous props
        const prevMsgs = prevProps.messages;
        const prevReadBy = prevMsgs[prevMsgs.length-1].readBy;
       
        if(readBy.includes(uid) && !prevReadBy.includes(uid)){
            //get member names
            const config = {headers: {'content-type': 'application/json'}};
            const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
            const memberNames = response.data.memberNames;

            this.setState({
                isRead: true,
                memberNames
            });
        }
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