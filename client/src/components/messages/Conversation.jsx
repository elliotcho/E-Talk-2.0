import React, {Component} from 'react';

import {connect} from 'react-redux';

import {getProfilePic} from '../../store/actions/profileActions';

import {
    setDisplayedChatId, 
    setMsgsOnDisplay,
    clearChatOnDisplay, 
    clearTyping
} from '../../store/actions/messagesActions';

import axios from 'axios';
import MessageBubble from './MesssageBubble';
import TypingBubble from './TypingBubble';
import loading from '../../images/loading.jpg';
import {io} from '../../App';

class Conversation extends Component{
    constructor(){
        super();
        
        this.state = {
            memberNames: 'Loading...',
            chatPics: []
        }

        this.getChatPics = this.getChatPics.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    async componentDidMount(){
        const {uid, chatId, isComposerChat} = this.props;

        //get and render messages
       this.props.setDisplayedChatId(chatId);
       this.props.setMsgsOnDisplay(chatId, uid, io);
    
       if(!isComposerChat){
            //config for post requests
            const config = {headers: {'content-type': 'application/json'}};

            await this.getChatPics(config);

            //get member names
            const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
            const memberNames = response.data.memberNames;

            this.setState({memberNames});
       }
    }

    async componentDidUpdate(prevProps){
        const {uid, chatId, isComposerChat} = this.props;

        //logic for rendering a new chat
        if(prevProps.chatId !== chatId && chatId !== 'new'){

            //clear the messages that shows that users are typing from the previous convo
            this.props.clearTyping();

            //get and render messages
            this.props.setMsgsOnDisplay(chatId, uid, io);
            this.props.setDisplayedChatId(chatId);

            if(!isComposerChat){
                //config for post requests
                const config = {headers: {'content-type': 'application/json'}};

                await this.getChatPics(config);
            
                //get member names
                const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
                const memberNames = response.data.memberNames;

                this.setState({memberNames});
            }
        }
    }

    async getChatPics(config){
          const {uid, chatId} = this.props;

          //get chat photo
          let response = await axios.post('http://localhost:5000/chats/photo', {uid, chatId}, config);
          const {members} = response.data;
     
          let chatPics = [];

          for(let i=0;i<members.length;i++){
              const imgURL = await getProfilePic(members[i]);
              chatPics.push(imgURL);
          }

          this.setState({chatPics});
    }

    handleScroll(){
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }

    componentWillUnmount(){
        this.props.clearTyping();
        this.props.clearChatOnDisplay();
    }

    render(){
        const {uid, msgsOnDisplay, typingMsgs, isComposerChat} = this.props;

        const {memberNames, chatPics} = this.state;

        const messages = msgsOnDisplay.map((msg, i) =>
            <MessageBubble 
                key={msg._id} 
                uid={uid} 
                msg={msg}
                handleScroll = {this.handleScroll}
                showRead = {
                    i === msgsOnDisplay.length -1 ||
                    msgsOnDisplay[i].uid !== msgsOnDisplay[i+1].uid ||
                    msgsOnDisplay[i].readBy.length !== msgsOnDisplay[i+1].readBy.length
                }   
            />
        );
        
        return(
            <div className ='convo'>
                {!isComposerChat? (<header>
                    <div className ='chat-info'>
                        {chatPics.length > 1?
                            ([
                                <img key={0} src={chatPics[0]} alt='profile-pic' className='chat-pic'/>,
                                <img  key={1} src={chatPics[1]} alt ='profile-pic' className='chat-pic second-pic'/>
                            ])
                            :(<img src={chatPics.length? chatPics[0]: loading} alt='profile-pic' className='chat-pic second-pic'/>)
                        }


                        <h2>{memberNames}</h2>
                    </div>
                </header>): null}

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

const mapDispatchToProps = (dispatch) =>{
    return{
        setMsgsOnDisplay: (chatId, uid, io) => {dispatch(setMsgsOnDisplay(chatId, uid, io));},
        setDisplayedChatId: (chatId) => {dispatch(setDisplayedChatId(chatId));},
        clearChatOnDisplay: () => {dispatch(clearChatOnDisplay());},
        clearTyping: () => {dispatch(clearTyping());}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);