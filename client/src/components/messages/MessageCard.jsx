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

        this.isCardRead = this.isCardRead.bind(this);
        this.formatContent = this.formatContent.bind(this);
        this.displayChat = this.displayChat.bind(this);
    }

    async componentDidMount(){
         const {uid, chatId, messages} = this.props;

        await this.isCardRead(messages, messages.length);

         //get member names
         const config = {headers: {'content-type': 'application/json'}};
         const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
         let memberNames = response.data.memberNames;
 
         if(memberNames > 20){
             memberNames = memberNames.substring(0, 20) + "...";
         }
 
         this.setState({
             memberNames
         });
    }

    async componentDidUpdate(prevProps){
        const {isActive, messages, timeOfLastMessage} = this.props;

        if((isActive !== prevProps.isActive) || (timeOfLastMessage!== prevProps.timeOfLastMessage)){
            await this.isCardRead(messages, messages.length);
        }
    }

    async isCardRead(messages, n){
        const {uid, chatId, isActive} = this.props;

        if(isActive){
            const config = {headers: {'content-type': 'application/json'}};
            
            await axios.post('http://localhost:5000/chats/messages/read', {uid, chatId}, config);    
            
            this.props.readChat();
            
            this.setState({isRead: true});
        }

        else{
            this.setState({isRead:messages[n-1].readBy.includes(uid)});
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