import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import loading from '../../../../images/loading.jpg';
import axios from 'axios';

class UserLike extends Component{
    constructor(){
        super();
        
        this.state = {
            firstName: 'Loading...',
            lastName: 'User...', 
            imgURL: null
        }

        this.toProfile = this.toProfile.bind(this);
    }

    componentDidMount(){
        const {uid} = this.props;

        axios.get(`http://localhost:5000/users/${uid}`).then(response => {
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName
            });
        });

        fetch(`http://localhost:5000/users/profilepic/${uid}`, {
            method: 'GET'
        }).then(response => response.blob())
        .then(file => {
            this.setState({imgURL: URL.createObjectURL(file)});
        });
    }

    toProfile(){
       this.props.history.push(`/profile/${this.props.uid}/posts`)
    }

    render(){
        const {firstName, lastName, imgURL} = this.state; 

        return(
            <div className ='user-like'>
                <img src={imgURL? imgURL: loading} onClick = {this.toProfile} alt ='profile pic'/>

                <h4 className ='text-primary d-inline-block ml-4' onClick = {this.toProfile}>
                    {firstName} {lastName}
                </h4>
            </div>
        )
    }
}

export default withRouter(UserLike);