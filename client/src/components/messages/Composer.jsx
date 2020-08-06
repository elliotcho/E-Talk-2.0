import React, {Component} from 'react';
import {connect} from 'react-redux';
import { clearComposer, addRecipient, removeRecipient} from '../../store/actions/messagesActions';
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
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleChange(e){
        const {uid, isSelected} = this.props;

        io.emit('COMPOSE_MESSAGE_TO', {
            uid, 
            name: e.target.value, 
            isSelected
        });

        this.setState({query: e.target.value});
    }

    clickUser(userinfo){
        const {uid, recipients, isSelected, addRecipient} = this.props;

        addRecipient(userinfo, recipients, isSelected);

        this.setState({query: ''}, ()=>{
            io.emit('COMPOSE_MESSAGE_TO', {uid, name: ''})
        });
    }

    handleKeyDown(e){
        const {query} = this.state;

        const {recipients, isSelected, removeRecipient} = this.props;

        if(e.keyCode === 8 && recipients.length > 0 && query === ''){
            removeRecipient(recipients, isSelected);
        }
    }

    componentWillUnmount(){
        this.props.clearComposer();
    }

    render(){
        const {composedTo, recipients} = this.props;

        return(
            <div className='composer'>
                <div className ='recipients-container'>
                    {recipients.map(user => 
                        <div key={user._id} className ='user-block text-white'>
                            {user.firstName} {user.lastName}
                        </div>
                    )}

                    <input 
                        type ='text' 
                        placeholder='Type a name...' 
                        onChange = {this.handleChange}
                        onKeyDown = {this.handleKeyDown}
                        value = {this.state.query}
                    />
                </div>

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
        recipients: state.messages.recipients,
        isSelected: state.messages.isSelected
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        clearComposer: () => {dispatch(clearComposer());},
        addRecipient: (userinfo, recipients, isSelected) => {dispatch(addRecipient(userinfo, recipients, isSelected));},
        removeRecipient: (recipients, isSelected) => {dispatch(removeRecipient(recipients, isSelected));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Composer);