import React, {Component} from 'react';
import ComposerResult from './ComposerResult';
import Conversation from './Conversation';
import {io} from '../../App';

class Composer extends Component{
    constructor(){
        super();

        this.state = {
            query: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.addRecipient = this.addRecipient.bind(this);
        this.deleteRecipient = this.deleteRecipient.bind(this);
    }

    handleChange(e){
        const {uid, recipients} = this.props;

        io.emit('SEARCH_COMPOSER', {
            uid, 
            recipients,
            name: e.target.value
        });

        this.setState({query: e.target.value});
    }

    addRecipient(user){
        const {uid, recipients, updateRecipients} = this.props;

        io.emit('SEARCH_COMPOSER', {
            uid,
            recipients,
            name: ''
        });

        if(recipients.length === 0){
            io.emit('RENDER_COMPOSER_CHAT', {
                members: [uid, user._id],
                uid
            });
        }

        else{
            this.props.clearComposerChat();
        }

        recipients.push(user);
        updateRecipients(recipients);

        this.setState({query: ''});
    }

    deleteRecipient(e){
        const {uid, recipients, updateRecipients} = this.props;
        
        const {query} = this.state;

        if(e.keyCode === 8 && recipients.length > 0 && query === ''){
            if(recipients.length === 2){
                io.emit('RENDER_COMPOSER_CHAT', {
                    members: [uid, recipients[0]._id],
                    uid
                });
            }

            else{
                this.props.clearComposerChat();
            }

            recipients.pop();
            updateRecipients(recipients);
        }
    }

    componentWillUnmount(){
        this.props.clearComposerChat();
        this.props.clearComposer();
    }

    render(){
        const {composerChatId, recipients} = this.props;

        const composerResults = this.props.composerResults.map(user =>
            <ComposerResult 
                key={user._id} 
                user={user}
                addRecipient = {this.addRecipient}
            />
        );

        return(
            <div className='composer'>
                <div className ='recipients-container'>
                    {recipients.map(user =>
                        <div key={user._id} className='user-block text-white'>
                            {user.firstName} {user.lastName}
                        </div>
                    )}

                    <input 
                        type ='text' 
                        placeholder='Type a name...' 
                        onChange = {this.handleChange}
                        onKeyDown = {this.deleteRecipient}
                        value = {this.state.query}
                    />
                </div>

                
                {composerResults}

                {composerChatId? 
                    <Conversation chatId = {composerChatId} isComposerChat = {true}/>: 
                    null
                }
            </div>
        )
    }
}

export default Composer;