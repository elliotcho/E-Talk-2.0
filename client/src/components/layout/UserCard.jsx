import React, {Component} from 'react';
import loading from '../../images/loading.jpg';
import './UserCard.css';

class UserCard extends Component{
    render(){
        return(
            <div className = 'user-card card col-6 col-sm-4 col-lg-2'>
                <img src = {loading} className ='card-img-top' alt = 'profile pic'/>

                <div className ='card-body'>
                    <h5 className ='card-title text-center'>
                        Gugsa Challa
                    </h5>
                </div>

                <div className ='card-footer text-center'>
                    <i className ='fas fa-user-plus'></i>
                </div>
            </div>
        )
    }
}

export default UserCard;