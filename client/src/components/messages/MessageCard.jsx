import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as msgActions from '../../store/actions/messagesActions';
import moment from 'moment';
import loading from '../../images/loading.jpg';

class MessageCard extends Component{
    constructor(){
        super();

        this.state = {
            isRead: true,
            memberNames: 'Loading...',
            chatPics: []
        }

        this.formatContent = this.formatContent.bind(this);
        this.displayChat = this.displayChat.bind(this);
    }

    async componentDidMount(){
         const {
             uid, 
             chatId, 
             messages, 
             isActive,
             dispatch
         } = this.props;

         const {
             getChatPics,
             getMemberNames,
             readChat
         } = msgActions;

     
        const isRead = await dispatch(readChat(chatId, uid, messages, isActive));
        const chatPics = await getChatPics(chatId, uid);
        let memberNames = await getMemberNames(chatId, uid);

        if(memberNames.length > 20){
            memberNames = memberNames.substring(0, 20) + "...";
        }

         this.setState({
             memberNames,
             chatPics,
             isRead
         });
    }

    async componentDidUpdate(prevProps){
        const {
            uid,
            chatId,
            isActive, 
            messages, 
            timeOfLastMessage,
            dispatch
        } = this.props;

        if((isActive !== prevProps.isActive) || (timeOfLastMessage !== prevProps.timeOfLastMessage)){
            const {readChat} = msgActions;

            const isRead = await dispatch(readChat(chatId, uid, messages, isActive));

            this.setState({isRead});
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
        const {
            isRead, 
            memberNames, 
            chatPics
        } = this.state;

        const {isActive,timeOfLastMessage} = this.props;

        const active = (isActive) ? 'active': '';

        return(
            <div className ={`msg-card card ${active} flex-row flex-wrap`} onClick={this.displayChat}>         
                    <div className ='card-header border-0'>
                        {
                            chatPics.length > 1? 
                            (<div className ='combined-img'>
                                <img src={chatPics[0]} alt='profile-pic' className='first-pic'/>
                                <img  src={chatPics[1]} alt ='profile-pic' className='second-pic'/>
                            </div>):
                            (<img src={chatPics.length? chatPics[0]: loading} alt='profile-pic'/>)
                        }
                    </div>
                      
                   <div className ='card-block'>
                        <h5>{memberNames}</h5>
                        
                        <p>
                            {isRead || isActive? 
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