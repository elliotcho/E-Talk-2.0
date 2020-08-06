import React, {Component} from 'react';
import {connect} from 'react-redux';
import { clearComposer, addRecipient } from '../../store/actions/messagesActions';
import UserComposedTo from './UserComposedTo';
import {io} from '../../App';

class Composer extends Component{
    constructor(){
        super();

        this.state= {
            query: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.clickUser = this.clickUser.bind(this);
    }

    handleChange(e){
        const {uid} = this.props;

        io.emit('COMPOSE_MESSAGE_TO', {
            uid, name: e.target.value
        });

        this.setState({query: e.target.value});
    }

    clickUser(userinfo){
        const {uid, recipients, addRecipient} = this.props;

        addRecipient(userinfo, recipients);

        this.setState({query: ''}, ()=>{
            io.emit('COMPOSE_MESSAGE_TO', {uid, name: ''})
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
                        id = 'query'
                        type ='text' 
                        placeholder='Type a name...' 
                        onChange = {this.handleChange}
                        value = {this.state.query}
                    />
                </form>

                {composedTo.map(user =>
                    <UserComposedTo 
                        key = {user._id}
                        user = {user}
                        clickUser = {() => {this.clickUser(user)}}
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