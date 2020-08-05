import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearUsersComposedTo} from '../../store/actions/messagesActions';
import SearchContacts from './SearchContacts';
import MessageCard from './MessageCard';
import Conversation from './Conversation';
import CreateMessage from './CreateMessage';
import Composer from './Composer';
import './Messages.css';

class MessagesHome extends Component{
    constructor(){
        super();

        this.state = {
            showComposer: false
        }
    }

    render(){
        const {showComposer} = this.state;

        const {uid, composedTo, clearUsersComposedTo} = this.props;

        return(
            <div className='messages'>
                <div className='container-fluid'>
                    <div className='row no-gutters'>
                        <div className ='col-4'>
                            <div className ='card-list-header'>
                                <h3>Chats</h3>
                                <i className ='fas fa-paper-plane' onClick = {() => {this.setState({showComposer:true})}}/>
                            </div>
 
                            <div className ='card-list'>
                                <SearchContacts/>

                                <MessageCard/>
                                <MessageCard/>
                                <MessageCard/>
                            </div>
                        </div>

                        <div className='col-8'>
                            {
                              showComposer?  
                                (<Composer 
                                    uid={uid} 
                                    composedTo={JSON.stringify(composedTo)}
                                    clearUsersComposedTo = {clearUsersComposedTo}
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

const mapStateToProps = (state) =>{
    return{
        composedTo: state.messages.composedTo
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        clearUsersComposedTo: () => {dispatch(clearUsersComposedTo());}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesHome);