import React, {Component} from 'react';
import ProfilePic from './ProfilePic';
import {withRouter} from 'react-router-dom';
import {io} from '../../../App';
import axios from 'axios';

class UserCard extends Component{
    constructor(){
        super();

        this.state = {
            firstName: 'Loading',
            lastName: 'User...',
            status: 'Add Friend'
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        const {profileId, uid} = this.props;

        axios.get(`http://localhost:5000/users/${profileId}`).then(response => {
            const {firstName, lastName} = response.data;
            
            this.setState({
                firstName,
                lastName,
            });
        });

        const config = {headers: {'content-type': 'application/json'}};

        axios.post('http://localhost:5000/friends/status', {receiverId: profileId, senderId: uid}, config).then(response =>{
            this.setState({status: response.data.status});
        });
    }

    handleClick(){
        const {status} = this.state;
        
        const {firstName, lastName} = this.state;

        const {uid, profileId} = this.props;

        if(status === 'Add Friend'){
            io.emit('CHANGE_FRIEND_STATUS', {status, senderId: uid, receiverId: profileId});     

            this.setState({
                status: 'Pending'
            });  
        }

        else if(status === 'Pending'){
            io.emit('CHANGE_FRIEND_STATUS', {status, senderId: uid, receiverId: profileId});     

            this.setState({
                status: 'Add Friend'
            });
        }

        else{
            if(!window.confirm(`Are you sure you want to unfriend ${firstName} ${lastName}?`)){
                return;
            }

            io.emit('CHANGE_FRIEND_STATUS', {status, senderId: uid, receiverId: profileId});     

            this.setState({
                status: 'Add Friend'
            });
        }
    }

    render(){
        const {firstName, lastName, status} = this.state;

        const {profileId, uid} = this.props;

        return(
            <div>
                <ProfilePic profileId = {profileId} uid = {uid}/>

                <section className ='mt-2 text-center'>
                    <div className ='user-name' onClick = {() => {this.props.history.push(`/profile/${profileId}/posts`)}}>
                        {firstName} {lastName}
                    </div>
                </section>

                {uid === profileId? null: 
                (<section className='user-buttons'>
                    <button className='btn btn-secondary btn-small' onClick = {this.handleClick}>{status}</button>
                    <button className='btn btn-primary btn-small'>Message</button>
                </section>)}
            </div>
        )
    }
}

export default withRouter(UserCard);