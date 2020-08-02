import React, {Component} from 'react';
import SearchContacts from './SearchContacts';
import MessageCard from './MessageCard';
import Converstaion from './Conversation';
import CreateMessage from './CreateMessage';
import './Messages.css';

class MessagesHome extends Component{
    render(){
        return(
            <div className='messages'>
                <div className='container-fluid'>
                    <div className='row no-gutters'>
                        <div className ='col-4'>
                            <div className ='card-list-header'>
                                <h3>Chats</h3>
                                <i className ='fas fa-paper-plane'/>
                            </div>
 
                            <div className ='card-list'>
                                <SearchContacts/>

                                <MessageCard/>
                                <MessageCard/>
                                <MessageCard/>
                            </div>
                        </div>

                        <div className='col-8'>
                            <Converstaion/>
                            <CreateMessage/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MessagesHome;