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
                            <div>
                                <SearchContacts/>
                            </div>

                            <div className ='card-list'>
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