import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Network.css';

import loading from '../../images/loading.jpg';

class Network extends Component{
    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        return(
            <div className = 'network'>
                <div>
                    <div className = 'request'>
                        <img src ={loading} className ='img-fluid' alt ='profile pic'/>
    
                        <h2 className = 'd-inline-block ml-3'>
                            <strong>Gugsa Challa </strong>
                            <span>sent you a friend request</span>
                        </h2>
                    
                        <div className ='d-inline-block'>
                            <button className ='btn btn-primary ml-3'>Accept</button>
                            <button className ='btn btn-light ml-3'>Delete Request</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Network;