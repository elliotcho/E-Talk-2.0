import React, {Component} from 'react';
import loading from '../../images/loading.jpg';

class FriendRequest extends Component{
    render(){
        return(
            <div className ='row request mb-3'>
                <div className ='col-4'>
                    <img src = {loading} className ='float-left' alt ='profile pic'/>
                </div>

                <div className ='col-8'>
                    <p><strong>Gugsa Challa</strong> sent you a friend request!</p>
                
                    <div>
                        <button className ='btn btn-success mr-3'>Accept</button>
                        <button className ='btn btn-danger'>Decline</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default FriendRequest;