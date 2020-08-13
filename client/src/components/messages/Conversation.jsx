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

        this.handleScroll = this.handleScroll.bind(this);
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

        this.setState({memberNames});
    }

    async componentDidUpdate(prevProps){
        const {uid, chatId} = this.props;

        //logic for rendering a new chat
        if(prevProps.chatId !== chatId && chatId !== 'new'){
            //get and render messages
            this.props.setMsgsOnDisplay(chatId);
            this.props.setDisplayedChatId(chatId);
            
            //get member names
            const config = {headers: {'content-type': 'application/json'}};
            const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
            const memberNames = response.data.memberNames;

            this.setState({memberNames});
        }
    }

    handleScroll(){
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }

    componentWillUnmount(){
        this.props.clearChatOnDisplay();
    }

    render(){
        const {uid, msgsOnDisplay} = this.props;

        const {memberNames} = this.state;

        const messages = msgsOnDisplay.map((msg, i) =>
            <MessageBubble 
                key={msg._id} 
                uid={uid} 
                msg={msg}
                lastMsg = {i === msgsOnDisplay.length-1}
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