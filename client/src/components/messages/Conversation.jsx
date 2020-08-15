import React, {Component} from 'react';
import axios from 'axios';
import MessageBubble from './MesssageBubble';
import TypingBubble from './TypingBubble';
import loading from '../../images/loading.jpg';

class Conversation extends Component{
    constructor(){
        super();
        
        this.state = {
            memberNames: 'Loading...',
            chatPics: []
        }

        this.handleScroll = this.handleScroll.bind(this);
    }

    async componentDidMount(){
        const {uid, chatId} = this.props;

        //get and render messages
       this.props.setMsgsOnDisplay(chatId, uid);
       this.props.setDisplayedChatId(chatId);

       //config for post requests
       const config = {headers: {'content-type': 'application/json'}};

       //get chat photo
       let response = await axios.post('http://localhost:5000/chats/photo', {uid, chatId}, config);
       const usersInPic = response.data;
       
       let chatPics = [];

       for(let i=0;i<usersInPic.length;i++){
            response = await fetch(`http://localhost:5000/users/profilepic/${usersInPic[i]}`);
            const file = await response.blob();
 
            chatPics.push(URL.createObjectURL(file));
       }

        //get member names
        response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
        const memberNames = response.data.memberNames;

        this.setState({memberNames, chatPics});
    }

    async componentDidUpdate(prevProps){
        const {uid, chatId} = this.props;

        //logic for rendering a new chat
        if(prevProps.chatId !== chatId && chatId !== 'new'){
            //get and render messages
            this.props.setMsgsOnDisplay(chatId, uid);
            this.props.setDisplayedChatId(chatId);

            //config for post requests
            const config = {headers: {'content-type': 'application/json'}};

            //get chat photo
            let response = await axios.post('http://localhost:5000/chats/photo', {uid, chatId}, config);
            const usersInPic = response.data;
       
            let chatPics = [];

            for(let i=0;i<usersInPic.length;i++){
                response = await fetch(`http://localhost:5000/users/profilepic/${usersInPic[i]}`);
                const file = await response.blob();
 
                chatPics.push(URL.createObjectURL(file));
            }
            
            //get member names
            response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
            const memberNames = response.data.memberNames;

            this.setState({memberNames, chatPics});
        }
    }

    handleScroll(){
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }

    componentWillUnmount(){
        this.props.clearChatOnDisplay();
    }

    render(){
        const {uid, msgsOnDisplay, typingMsgs} = this.props;

        const {memberNames, chatPics} = this.state;

        const messages = msgsOnDisplay.map((msg, i) =>
            <MessageBubble 
                key={msg._id} 
                uid={uid} 
                msg={msg}
                handleScroll = {this.handleScroll}
                showRead = {
                    i === msgsOnDisplay.length -1 ||
                    msgsOnDisplay[i].uid !== msgsOnDisplay[i+1].uid
                }   
            />
        );
      
        return(
            <div className ='convo'>
                <header>
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
                </header>

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

export default Conversation;