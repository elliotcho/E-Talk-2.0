import React, {Component} from 'react';
import ProfilePic from './ProfilePic';
import axios from 'axios';

class UserCard extends Component{
    constructor(){
        super();
        this.state = {
            firstName: 'Loading',
            lastName: 'User...'
        }
    }

    componentDidMount(){
        const {profileId} = this.props;

        axios.get(`http://localhost:5000/users/${profileId}`).then(response => {
            const {firstName, lastName} = response.data;
            
            this.setState({
                firstName,
                lastName,
            });
        });
    }

    render(){
        const {firstName, lastName} = this.state;

        const {profileId, uid} = this.props;

        return(
            <div>
                <ProfilePic profileId = {profileId} uid = {uid}/>

                <section className ='mt-2 text-center'>
                    <div className ='user-name'>
                        {firstName} {lastName}
                    </div>
                </section>

                <section className='user-buttons'>
                    <button className='btn btn-secondary btn-small'>Add Friend</button>
                    <button className='btn btn-primary btn-small'>Message</button>
                </section>
            </div>
        )
    }
}

export default UserCard;