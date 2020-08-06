import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserComposedTo from './UserComposedTo';
import {io} from '../../App';
import { clearComposer, addRecipient } from '../../store/actions/messagesActions';

class Composer extends Component{
    constructor(){
        super();

        this.state = {
            
        }

        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleKeyUp(e){
        const {uid} = this.props;

        io.emit('COMPOSE_MESSAGE_TO', {
            uid, name: e.target.value
        });
    }

    componentWillUnmount(){
        this.props.clearComposer();
    }

    render(){
        const {composedTo, recipients} = this.props;

        return(
            <div className='composer'>
                <form>
                    {recipients.map(user => 
                        <div key={user._id} className ='user-block text-white'>
                            {user.firstName} {user.lastName}
                        </div>
                    )}

                    <input 
                        type ='text' 
                        placeholder='Type a name...' 
                        onKeyUp = {this.handleKeyUp}
                    />
                </form>

                {composedTo.map(user =>
                    <UserComposedTo 
                        key = {user._id}
                        user = {user}
                    />
                )}  
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        composedTo: state.messages.composedTo,
        recipients: state.messages.recipients
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        clearComposer: () => {dispatch(clearComposer());},
        addRecipient: (userinfo, recipients) => {dispatch(addRecipient(userinfo, recipients));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Composer);