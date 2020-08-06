import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import SearchContacts from './SearchContacts';
import Conversation from './Conversation';
import CreateMessage from './CreateMessage';
import Composer from './Composer';
import './Messages.css';

class MessagesHome extends Component{
    constructor(){
        super();
        this.handleComposer = this.handleComposer.bind(this);
    }

    handleComposer(){
        const {id} = this.props.match.params;

        if(id === 'new'){
            this.props.history.push('/chat/home');
        }

        else{
            this.props.history.push('/chat/new');
        }
    }

    render(){
        const chatId = this.props.match.params.id;

        const {uid} = this.props;

        return(
            <div className='messages'>
                <div className='container-fluid'>
                    <div className='row no-gutters'>
                        <div className ='col-4'>
                            <div className ='card-list-header'>
                                <h3>Chats</h3>
                                
                                {chatId ==='new'?
                                    (<i className = 'fas fa-times' onClick = {this.handleComposer}/>)
                                    : (<i className ='fas fa-paper-plane' onClick = {this.handleComposer}/>)
                                }
                            </div>
 
                            <div className ='card-list'>
                                <SearchContacts/>
                            </div>
                        </div>

                        <div className='col-8'>
                            {
                              chatId === 'new'?  
                                (<Composer 
                                    uid={uid} 
                                />): 
                                <Conversation/>
                            }

                            <CreateMessage/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MessagesHome);