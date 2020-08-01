import React, {Component} from 'react';
import loading from '../../images/loading.jpg';

class MessageCard extends Component{
    render(){
        return(
            <div className ='msg-card'>
                <div>
                    <img src={loading} alt='profile-pic'/>
                      
                    <div className ='msg-card-text'>
                        <h5>Gugsa Challa</h5>
                        <p>
                            {'This guy is comedybbba;'.substring(0,20) + '...'}
                        </p>
                    </div>
                    
                    <p className='msg-card-date'>September 30, 2013</p>
                </div>
            </div>
        )
    }
}

export default MessageCard;