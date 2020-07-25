import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import FriendRequest from './FriendRequest';
import './Network.css';

class Network extends Component{
    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        return(
            <div className = 'network'>
                <FriendRequest/>
                <FriendRequest/>
                <FriendRequest/>
                <FriendRequest/>
            </div>
        )
    }
}

export default Network;