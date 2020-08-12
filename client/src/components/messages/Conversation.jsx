import React, {Component} from 'react';
import axios from 'axios';
import MessageBubble from './MesssageBubble';
import loading from '../../images/loading.jpg';

class Conversation extends Component{
    constructor(){
        super();
        
        this.state = {
            memberNames: 'Loading...'
        }
    }

    async componentDidMount(){
        const {uid, chatId} = this.props;

        //get and render messages
       this.props.setMsgsOnDisplay(chatId);
       this.props.setDisplayedChatId(chatId);

        //get member names
        const config = {headers: {'content-type': 'application/json'}};
        const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
        const memberNames = response.data.memberNames;

        //make sure that the messages are shown from bottom to top
        this.chatBox.scrollTop = this.chatBox.scrollHeight;

        this.setState({memberNames});
    }

    async componentDidUpdate(prevProps){
        const {uid, chatId} = this.props;

        if(prevProps.chatId !== chatId && chatId !== 'new'){
            //get and render messages
            this.props.setMsgsOnDisplay(chatId);
            this.props.setDisplayedChatId(chatId);
            
            //get member names
            const config = {headers: {'content-type': 'application/json'}};
            const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
            const memberNames = response.data.memberNames;

            //make sure that the messages are shown from bottom to top
            this.chatBox.scrollTop = this.chatBox.scrollHeight;

            this.setState({memberNames});
        }

        const {msgsOnDisplay} = this.props;
        const m = msgsOnDisplay.length;

        const prevMsgsOnDisplay = prevProps.msgsOnDisplay;
        const n = prevMsgsOnDisplay.length;

        //check if we're rendering the same conversation as before the update
        if(prevProps.chatId === chatId && chatId !=='new' && m>0 && n>0){

            //reset scroll on new message
            if(msgsOnDisplay[m-1]._id !== prevMsgsOnDisplay[n-1]._id){
                this.chatBox.scrollTop = this.chatBox.scrollHeight;
            }
        }
    }

    render(){
        const {uid, msgsOnDisplay} = this.props;

        const {memberNames} = this.state;

        const messages = msgsOnDisplay.map((msg, i) =>
            <MessageBubble 
                key={msg._id} 
                uid={uid} 
                msg={msg}
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
                        <img src={loading} className='chat-pic' alt='chat pic'/>
                        <h2>
                            {memberNames}
                        </h2>
                    </div>
                </header>

                <section className ='chat-box' ref = {ele => this.chatBox = ele}>
                    {messages}
                </section>
            </div>
        )
    }
}

export default Conversation;