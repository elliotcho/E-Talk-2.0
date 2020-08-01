import React, {Component} from 'react';
import loading from '../../images/loading.jpg';

class Conversation extends Component{
    render(){
        return(
            <div className ='convo'>
                <header className ='convo-header'>
                    <div className ='chat-info'>
                        <img src={loading} className='chat-pic' alt='chat pic'/>
                        <h2>Gugsa Challa, Jeet Undhad</h2>
                    </div>
                </header>
            </div>
        )
    }
}

export default Conversation;