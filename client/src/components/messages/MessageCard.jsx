import React, {Component} from 'react';
import loading from '../../images/loading.jpg';

class MessageCard extends Component{
    render(){
        return(
            <div className ='msg-card card flex-row flex-wrap'>         
                    <div className ='card-header border-0'>
                        <img src={loading} alt='profile-pic'/>
                    </div>
                      
                   <div className ='card-block'>
                        <h3>Gugsa Challa van Persie</h3>
                        
                        <p>{'This guy is comedy bbb bbb'.substring(0,20)}</p>
                        
                        <p className='text-muted'>October 15, 2019</p>
                   </div>
            </div>
        )
    }
}

export default MessageCard;