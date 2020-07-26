import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import loading from '../../images/loading.jpg';
import {io} from '../../App';
import './UserCard.css';

class UserCard extends Component{
    constructor(){
        super();

        this.state = {
            imgURL: null
        }

        this.toProfile = this.toProfile.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        const {_id} = this.props.user;

        fetch(`http://localhost:5000/users/profilepic/${_id}`, {
            method: 'GET'
        }).then(response => response.blob())
        .then(file => {
            this.setState({imgURL: URL.createObjectURL(file)});
        });
    }

    toProfile(id){
        this.props.history.push(`/profile/${id}/posts`);
    }

    handleClick(){
        const cardId = this.props.user._id;

        const {uid} = this.props;

        io.emit("FRIEND_REQUEST", {senderId: uid, receiverId: cardId});        
    }

    render(){
        const {imgURL} = this.state;

        const {uid, type} = this.props;

        const {_id, firstName, lastName} = this.props.user;

        //'fas fa-user-plus Add friend
        //'fas fa-user-clock' Pending
        //'fa fa-check

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
                    <i className ='fas fa-user-plus mr-2'></i>
                    <span>Add Friend</span>
                </div>}
            </div>
        )
    }
}

export default withRouter(UserCard);