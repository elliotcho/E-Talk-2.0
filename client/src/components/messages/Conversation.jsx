import React, {Component} from 'react';
import axios from 'axios';
import MessageBubble from './MesssageBubble';
import loading from '../../images/loading.jpg';

class Conversation extends Component{
    constructor(){
        super();
        this.state = {
            chat: null
        }
    }

    componentDidMount(){
        const {chatId} = this.props;

        if(chatId !== 'home' && chatId !=='new'){
            axios.get(`http://localhost:5000/chats/${chatId}`).then(response =>{
                this.setState({chat: response.data});
            });
        }
    }

    render(){
        const {chat} = this.state;

        const {uid} = this.props;

        return(
            <div className ='convo'>
                <header>
                    <div className ='chat-info'>
                        <img src={loading} className='chat-pic' alt='chat pic'/>
                        <h2>Gugsa Challa, Jeet Undhad</h2>
                    </div>
                </header>

                <section className ='chat-box'>
                    {chat? chat.messages.map(msg =>
                        <MessageBubble msg={msg} uid={uid}/>
                    ): null}
                </section>
            </div>
        )
    }
}

export default Conversation;