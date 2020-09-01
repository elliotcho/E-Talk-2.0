import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as msgActions from '../../../store/actions/messagesActions';
import {getProfilePic} from '../../../store/actions/profileActions';
import MessageBubble from './MesssageBubble';
import TypingBubble from './TypingBubble';
import loading from '../../../images/loading.jpg';
import {io} from '../../../App';

class Conversation extends Component{
    constructor(){
        super();
        
        this.state = {
            memberNames: 'Loading...',
            chatPics: []
        }

        this.onConvoUpdate = this.onConvoUpdate.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.showRead = this.getShowRead.bind(this);
    }

    async componentDidMount(){
        await this.onConvoUpdate();
    }

    async componentDidUpdate(prevProps){
        const {chatId, dispatch} = this.props;

        //logic for rendering a new chat
        if(prevProps.chatId !== chatId && chatId !== 'new'){
            //clear the messages that shows that users are typing from the previous convo
            await dispatch(msgActions.clearTyping());

            await this.onConvoUpdate()
        }
    }

    async onConvoUpdate(){
        const {uid, chatId, isComposerChat, dispatch} = this.props;

        const {
            getChatPics,
            getMemberNames,
            setDisplayedChatId,
            setMsgsOnDisplay
        } = msgActions;

        //get and render messages
       await dispatch(setDisplayedChatId(chatId));
       await dispatch(setMsgsOnDisplay(chatId, uid, io));
    
       if(!isComposerChat){
            const chatPics = await getChatPics(chatId, uid, getProfilePic);
            const memberNames = await getMemberNames(chatId, uid);
           
            this.setState({
                memberNames,
                chatPics
            });
       }
    }

    handleScroll(){
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }

    getShowRead(i){
        const {msgsOnDisplay} = this.props;

        return (i === msgsOnDisplay.length -1 ||
                msgsOnDisplay[i].uid !== msgsOnDisplay[i+1].uid ||
                msgsOnDisplay[i].readBy.length !== msgsOnDisplay[i+1].readBy.length
               );
    }

    componentWillUnmount(){
        const {dispatch} = this.props;

        const {
            clearTyping,
            clearChatOnDisplay
        } = msgActions;

        dispatch(clearTyping());
        dispatch(clearChatOnDisplay());
    }

    render(){
        const {
            uid, 
            msgsOnDisplay, 
            typingMsgs, 
            isComposerChat
        } = this.props;

        const {
            memberNames, 
            chatPics
        } = this.state;

        const messages = msgsOnDisplay.map((msg, i) =>
            <MessageBubble 
                key={msg._id} 
                uid={uid} 
                msg={msg}
                handleScroll = {this.handleScroll}
                showRead = {this.getShowRead(i)}
            />
        );
        
        return(
            <div className ='convo'>
                {!isComposerChat? 
                    (<header>
                        <div className ='chat-info'>
                            {chatPics.length > 1?
                                ([
                                    <img 
                                        key={0} 
                                        src={chatPics[0]} 
                                        alt='profile-pic' 
                                        className='chat-pic'
                                    />,
                                    <img  
                                        key={1} 
                                        src={chatPics[1]} 
                                        alt ='profile-pic' 
                                        className='chat-pic second-pic'
                                    />
                                ]):
                                (<img 
                                    src={chatPics.length? chatPics[0]: loading} 
                                    alt='profile-pic' 
                                    className='chat-pic second-pic'
                                />)
                            }

                            <h2>{memberNames}</h2>
                        </div>
                    </header>): 
                    null
            }

                <section className ='chat-box' ref = {ele => this.chatBox = ele}>
                    {messages}
                    
                    {typingMsgs.map(user =>
                        <TypingBubble
                            key = {user.typingId}
                            typingId = {user.typingId}
                            msg = {user.msg}
                            handleScroll = {this.handleScroll}
                            display = {user.typingId !== uid}
                        />
                    )}
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid,
        msgsOnDisplay: state.messages.msgsOnDisplay,
        displayedChatId: state.messages.displayedChatId,
        typingMsgs: state.messages.typingMsgs
    }
}

export default connect(mapStateToProps)(Conversation);