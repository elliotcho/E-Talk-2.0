import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserData} from '../../../store/actions/profileActions';
import {getFriendStatus} from '../../../store/actions/friendsActions';
import {checkIfChatExists, updateRecipients} from '../../../store/actions/messagesActions';
import ProfilePic from './ProfilePic';
import {io} from '../../../App';

class ProfileInfo extends Component{
    constructor(){
        super();

        this.state = {
            firstName: 'Loading',
            lastName: 'User...',
            status: 'Add Friend'
        }

        this.changeFriendStatus = this.changeFriendStatus.bind(this);
        this.messageUser = this.messageUser.bind(this);
    }

    async componentDidMount(){
        const {profileId, uid} = this.props;

        const user = await getUserData(profileId);
        const status = await getFriendStatus(profileId, uid);

        this.setState({
            firstName: user.firstName, 
            lastName: user.lastName,
            status
        });
    }

    changeFriendStatus(){
        const {firstName, lastName, status} = this.state;
        const {uid, profileId} = this.props;

        if(status === 'Add Friend'){
            io.emit('CHANGE_FRIEND_STATUS', {
                status, 
                senderId: uid, 
                receiverId: profileId
            });     

            this.setState({status: 'Pending'});  
        }

        else if(status === 'Pending'){
            io.emit('CHANGE_FRIEND_STATUS', {
                status, 
                senderId: uid, 
                receiverId: profileId
            });     

            this.setState({status: 'Add Friend'});
        }

        else{
            if(!window.confirm(`Are you sure you want to unfriend ${firstName} ${lastName}?`)){
                return;
            }

            io.emit('CHANGE_FRIEND_STATUS', {
                status, 
                senderId: uid, 
                receiverId: profileId
            });     

            this.setState({status: 'Add Friend'});
        }
    }

    async messageUser(){
        const {firstName, lastName} = this.state;
        const {uid, profileId, dispatch} = this.props;

        const chatId = await checkIfChatExists([uid, profileId]);

        if(chatId){
            this.props.history.push(`/chat/${chatId}`);
        }

        else{
            dispatch(updateRecipients([{_id: profileId, firstName, lastName}]));
            this.props.history.push('/chat/new');
        }
    }

    render(){
        const {firstName, lastName, status} = this.state;
        const {profileId, uid} = this.props;

        const toProfile = () => this.props.history.push(`/profile/${profileId}/posts`);

        return(
            <div>
                <ProfilePic profileId = {profileId} uid = {uid}/>

                <section className ='mt-2 text-center'>
                    <div className ='user-name' onClick = {toProfile}>
                        {firstName} {lastName}
                    </div>
                </section>

                {uid !== profileId? 
                    (<section className='user-buttons'>
                        <button className='btn btn-secondary btn-small' onClick = {this.changeFriendStatus}>
                            {status}
                        </button>
                    
                        <button className='btn btn-primary btn-small' onClick = {this.messageUser}>
                            Message
                        </button>
                    </section>):
                    null
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default withRouter(connect(null, mapDispatchToProps)(ProfileInfo));