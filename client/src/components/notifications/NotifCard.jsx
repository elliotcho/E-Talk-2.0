import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import loading from '../../images/loading.jpg';

class NotifCard extends Component{
    constructor(){
        super();

        this.state = {
            firstName: 'Loading...',
            lastName: 'User...',
            imgURL: null
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        const {senderId} = this.props.notif;

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

    handleClick(){
        const {senderId, type} = this.props.notif;

        if(type === 'ACCEPT_REQUEST'){
            this.props.history.push(`/profile/${senderId}/posts`);
        }     
    }

    render(){
        const {firstName, lastName, imgURL} = this.state;

        const {msg, date} = this.props.notif;

        return(
            <div className ='row notif-card mb-3' onClick = {this.handleClick}>
                <div className ='col-4'>
                    <img src={imgURL? imgURL: loading} className='float-left' alt='profile pic'/>
                </div>

                <div className ='col-8'>
                    <p>
                        <strong>{firstName} {lastName} </strong> 
                        {msg}
                    </p>

                    <div className ='notif-date'>
                        {moment(date).calendar()}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(NotifCard);