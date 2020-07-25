import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {io} from '../../App';
import loading from '../../images/loading.jpg';

class FriendRequest extends Component{
    constructor(){
        super();
        
        this.state = {
            firstName: 'Loading...',
            lastName: 'User...',
            imgURL: null
        }

        this.toProfile = this.toProfile.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        const {senderId} = this.props.request;

        axios.get(`http://localhost:5000/users/${senderId}`).then(response => {
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName
            });
        });

        fetch(`http://localhost:5000/users/profilepic/${senderId}`, {
            method: 'GET'
        }).then(response => response.blob())
        .then(file => {
            this.setState({imgURL: URL.createObjectURL(file)});
        });
    }

    toProfile(){
        const {
            senderId
        } = this.props.request;

        this.props.history.push(`/profile/${senderId}/posts`);
    }

    handleClick(eventType){
        const {_id, receiverId, senderId} = this.props.request;

        this.props.deleteRequest(_id);

        io.emit(eventType, {requestId: _id, receiverId, senderId});
    }

    render(){
        const {firstName, lastName, imgURL} = this.state;

        return(
            <div className ='row request mb-3'>
                <div className ='col-4'>
                    <img src={imgURL? imgURL: loading} className='float-left' alt='profile pic' onClick={this.toProfile}/>
                </div>

                <div className ='col-8'>
                    <p>
                        <strong onClick={this.toProfile}>{firstName} {lastName} </strong> 
                        sent you a friend request!
                    </p>
                
                    <div>
                        <button className ='btn btn-success mr-3' onClick={() => this.handleClick("ACCEPT_REQUEST")}>
                            Accept
                        </button>
                        
                        <button className ='btn btn-danger' onClick={() => this.handleClick("DECLINE_REQUEST")}>
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(FriendRequest);