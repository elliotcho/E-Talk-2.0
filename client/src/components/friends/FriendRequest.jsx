import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getUserData, getProfilePic} from '../../store/actions/profileActions';
import {getFriendStatus} from '../../store/actions/friendsActions';
import loading from '../../images/loading.jpg';
import {io} from '../../App';

class FriendRequest extends Component{
    constructor(){
        super();
        
        this.state = {
            firstName: 'Loading...',
            lastName: 'User...',
            imgURL: null,
            status: 'Pending'
        }

        this.toProfile = this.toProfile.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount(){
        const {receiverId, senderId} = this.props.request;

        const user = await getUserData(senderId);
        const imgURL = await getProfilePic(senderId);
        const status = await getFriendStatus(receiverId, senderId);

        this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            imgURL,
            status
        });
    }

    toProfile(){
        const {senderId} = this.props.request;
        this.props.history.push(`/profile/${senderId}/posts`);
    }

    handleClick(eventType){
        const {_id, receiverId, senderId} = this.props.request;
        const {status} = this.state;

        this.props.deleteRequest(_id);

        io.emit(eventType, {
            status, 
            receiverId, 
            senderId
        });
    }

    render(){
        const {firstName, lastName, imgURL} = this.state;

        const acceptRequest = () => this.handleClick("ACCEPT_REQUEST");
        const declineRequest = () => this.handleClick("DECLINE_REQUEST");

        return(
            <div className ='row request mb-3'>
                <div className ='col-4'>
                    <img 
                        src={imgURL? imgURL: loading} 
                        className='float-left' 
                        alt='profile pic' 
                        onClick={this.toProfile}
                    />
                </div>

                <div className ='col-8'>
                    <p>
                        <strong onClick={this.toProfile}>{firstName} {lastName} </strong> 
                        sent you a friend request!
                    </p>
                
                    <div>
                        <button className ='btn btn-success mr-3' onClick={acceptRequest}>
                            Accept
                        </button>
                        
                        <button className ='btn btn-danger' onClick={declineRequest}>
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(FriendRequest);