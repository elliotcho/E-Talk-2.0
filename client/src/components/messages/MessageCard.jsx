import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as msgActions from '../../store/actions/messagesActions';
import {getUserData} from '../../store/actions/profileActions';
import moment from 'moment';
import loading from '../../images/loading.jpg';

class MessageCard extends Component{
    constructor(){
        super();

        this.state = {
            isRead: true,
            memberNames: 'Loading...',
            chatPics: [],
            content: ''
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
        const content = await this.formatContent();
        let memberNames = await getMemberNames(chatId, uid);

        if(memberNames.length > 20){
            memberNames = memberNames.substring(0, 20) + "...";
        }

         this.setState({
             memberNames,
             chatPics,
             isRead,
             content
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
            const content = await this.formatContent();

            this.setState({
                isRead,
                content
            });
        }
    }

    async formatContent(){
        const {messages} = this.props;
        const n = messages.length;

        const {content, uid, image} = messages[n - 1];

        if(image){
            const user = await getUserData(uid);
            const {firstName} = user;

            return `${firstName} sent a photo`;
        }

        else if(content.length > 20){
            return content.substring(0, 20) + '...';
        }

        return content;
    }

    displayChat(){
        const {
            uid, 
            chatId, 
            dispatch, 
            clearContactsQuery, 
            getUserChats
        } = this.props;

        dispatch(getUserChats(uid));
        clearContactsQuery();

        this.props.history.push(`/chat/${chatId}`);
    }

    render(){
        const {
            isRead, 
            memberNames, 
            chatPics,
            content
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
                                content
                               :(<strong className ='text-dark'>
                                   {content}
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