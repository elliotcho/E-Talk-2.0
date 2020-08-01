import React, {Component} from 'react';
import SearchContacts from './SearchContacts';
import MessageCard from './MessageCard';
import Converstaion from './Conversation';
import CreateMessage from './CreateMessage';
import './Messages.css';

class MessagesHome extends Component{
    render(){
        return(
            <div className ='messages'>
                <div>
                    <div>
                        <SearchContacts/>
                    </div>

                    <div className ='card-list'>
                        <MessageCard/>
                        <MessageCard/>
                        <MessageCard/>
                        <MessageCard/>
                        <MessageCard/>
                        <MessageCard/>
                        <MessageCard/>
                    </div>
                </div>

                <div>
                    <Converstaion/>
                    <CreateMessage/>
                </div>
            </div>
        )
    }
}

export default MessagesHome;