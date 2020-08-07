import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
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

        const {recipients} = this.props;

        let msg = "You haven't finished composing your message? Are you sure you want to exit?";

        if(id === 'new'){
            if(recipients.length !==0 && !window.confirm(msg)){
                return;
            }

            this.props.history.push('/chat/home');
        }

        else{
            this.props.history.push('/chat/new');
        }
    }

    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        const chatId = this.props.match.params.id;

        const messageCards = [];

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

                                {messageCards.length === 0?
                                    <h3 className='no-cards'>No messages available</h3>:
                                    messageCards
                                }
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

                            <CreateMessage chatId={chatId}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        recipients: state.messages.recipients
    }
}

export default withRouter(connect(mapStateToProps)(MessagesHome));