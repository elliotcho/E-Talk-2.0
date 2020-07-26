import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import loading from '../../images/loading.jpg';
import axios from 'axios';
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

    componentDidMount(){
        const {_id} = this.props.user;

        const {uid} = this.props;

        const config = {headers: {'content-type': 'application/json'}};

        fetch(`http://localhost:5000/users/profilepic/${_id}`, {
            method: 'GET'
        }).then(response => response.blob())
        .then(file => {
            this.setState({imgURL: URL.createObjectURL(file)});
        });

        axios.post('http://localhost:5000/friends/status', {receiverId: _id, senderId: uid}, config).then(response =>{
            this.setState({status: response.data.status});
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
            this.setState({
                status: 'Pending'
            });
 
            io.emit("FRIEND_REQUEST", {senderId: uid, receiverId: _id});       
        }

        else if(status === 'Pending'){
            this.setState({
                status: 'Add Friend'
            });
        }

        else{
            if(!window.confirm(`Are you sure you want to unfriend ${firstName} ${lastName}?`)){
                return;
            }

            this.setState({
                status: 'Add Friend'
            });
        }
    }

    render(){
        const {imgURL, status} = this.state;

        const {uid, type} = this.props;

        const {_id, firstName, lastName} = this.props.user;

        //'fas fa-user-plus Add friend
        //'fas fa-user-clock' Pending
        //'fa fa-check Friends

        const dimensions = (type==='friend')? 'col-7 col-sm-5 col-lg-3': 'col-6 col-sm-4 col-lg-2'

        return(
            <div className = {`user-card card ${dimensions}`}>
                <img src = {imgURL? imgURL: loading} className ='card-img-top' alt = 'profile pic'/>

                <div className ='card-body'>
                    <h5 className ='card-title text-center text-primary' onClick={()=>{this.toProfile(_id)}}>
                        {firstName} {lastName}
                    </h5>
                </div>

                {uid === _id? null: <div className ='card-footer text-center' onClick = {this.handleClick}>
                    {status === 'Add Friend' ? <i className ='fas fa-user-plus mr-2'/>:
                    status === 'Pending' ? <i className ='fas fa-user-clock mr-2'/>:
                    <i className ='fa fa-check mr-2'/>}
                    <span>{status}</span>
                </div>}
            </div>
        )
    }
}

export default withRouter(UserCard);