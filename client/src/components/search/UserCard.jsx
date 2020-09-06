import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getProfilePic} from '../../store/actions/profileActions';
import {getFriendStatus} from '../../store/actions/friendsActions';
import loading from '../../images/loading.jpg';
import {io} from '../../App';
import './UserCard.css';

class UserCard extends Component{
    constructor(){
        super();

        this.state = {
            status: 'Add Friend',
            imgURL: null
        }

        this.toProfile = this.toProfile.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount(){
        const {_id} = this.props.user;
        const {uid} = this.props;

        const imgURL = await getProfilePic(_id);
        const status = await getFriendStatus(_id, uid);
        
        this.setState({
            status,
            imgURL
        });
    }

    toProfile(id){
        this.props.history.push(`/profile/${id}/posts`);
    }

    handleClick(){
        const {status} = this.state;
        const {_id, firstName, lastName} = this.props.user;
        const {uid} = this.props;

        if(status === 'Add Friend'){
            io.emit('CHANGE_FRIEND_STATUS', {
                status, 
                senderId: uid, 
                receiverId: _id
            }); 

            this.setState({status: 'Pending'});             
        }

        else if(status === 'Pending'){
            io.emit('CHANGE_FRIEND_STATUS', {
                status, 
                senderId: uid, 
                receiverId: _id
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
                receiverId: _id
            }); 

            this.setState({status: 'Add Friend'});
        }
    }

    render(){
        const {imgURL, status} = this.state;
        const {uid, type} = this.props;
        const {_id, firstName, lastName} = this.props.user;

        const toProfile = () => {this.props.history.push(`/profile/${_id}/posts`);}

        const dimensions = (type ==='friend')? 
            'col-7 col-sm-5 col-lg-3': 
            'col-6 col-sm-4 col-lg-2';

        return(
            <div className = {`user-card card ${dimensions}`}>
                <img 
                    src = {imgURL? imgURL: loading} 
                    className ='card-img-top' 
                    alt = 'profile pic'
                />

                <div className ='card-body'>
                    <h5 className ='card-title text-center text-primary' onClick={toProfile}>
                        {firstName} {lastName}
                    </h5>
                </div>

                {uid !== _id?  
                    (<div className ='card-footer text-center' onClick = {this.handleClick}>
                        {status === 'Add Friend' ? 
                            (<i className ='fas fa-user-plus mr-2'/>): status === 'Pending'? 
                            (<i className ='fas fa-user-clock mr-2'/>):
                            (<i className ='fa fa-check mr-2'/>)
                        }
                        
                        <span>{status}</span>
                    </div>):
                    null
                }
            </div>
        )
    }
}

export default withRouter(UserCard);