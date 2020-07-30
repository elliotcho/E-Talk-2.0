import React, {Component} from 'react';
import loading from '../../images/loading.jpg';

class NotifCard extends Component{
    render(){
        return(
            <div className ='row notif-card mb-3'>
                <div className ='col-4'>
                    <img src={loading} className='float-left' alt='profile pic'/>
                </div>

                <div className ='col-8'>
                    <p>
                        <strong>Gugsa Challa </strong> 
                        accepted your friend request
                    </p>

                    <div className ='notif-date'>
                        September 30, 2018
                    </div>
                </div>
            </div>
        )
    }
}

export default NotifCard;