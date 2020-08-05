import React, {Component} from 'react';
import UserComposedTo from './UserComposedTo';
import {io} from '../../App';

class Composer extends Component{
    constructor(){
        super();
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleKeyUp(e){
        const {uid} = this.props;

        io.emit('COMPOSE_MESSAGE_TO', {
            uid, name: e.target.value
        });
    }

    componentWillUnmount(){
        this.props.clearUsersComposedTo()
    }

    render(){
        const composedTo = JSON.parse(this.props.composedTo);

        return(
            <div className='composer'>
                <form>
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

export default Composer;