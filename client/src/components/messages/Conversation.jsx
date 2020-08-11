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
       this.props.setMsgsOnDisplay(chatId, uid);
       this.props.setDisplayedChatId(chatId);

        //get member names
        const config = {headers: {'content-type': 'application/json'}};
        const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
        const memberNames = response.data.memberNames;

        this.setState({memberNames});
    }

    async componentDidUpdate(prevProps){
        const {uid, chatId} = this.props;

        if(prevProps.chatId !== chatId && chatId !== 'new'){
            //get and render messages
            this.props.setMsgsOnDisplay(chatId, uid);
            this.props.setDisplayedChatId(chatId);
            
            //get member names
            const config = {headers: {'content-type': 'application/json'}};
            const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
            const memberNames = response.data.memberNames;

            this.setState({memberNames});
        }
    }

    render(){
        const {uid, msgsOnDisplay} = this.props;

        const {memberNames} = this.state;

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

                <section className ='chat-box'>
                    {msgsOnDisplay.map(msg =>
                        <MessageBubble 
                            key ={msg._id} 
                            uid={uid} 
                            msg={msg}
                        />
                    )}
                </section>
            </div>
        )
    }
}

export default Conversation;