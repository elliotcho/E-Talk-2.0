import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import loading from '../../images/loading.jpg';
import axios from 'axios';
import './Notifications.css';

class FriendRequestToast extends Component{
    constructor(){
        super();

        this.state = {
            firstName: 'Loading...', 
            lastName: 'User...',
            imgURL: null
        }

        this.toNetwork = this.toNetwork.bind(this);
        this.toNotifs = this.toNotifs.bind(this);
    }

    componentDidMount(){
        const {toastId} = this.props.data;

        axios.get(`http://localhost:5000/users/${toastId}`).then(response => {
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName
            });
        });

        fetch(`http://localhost:5000/users/profilepic/${toastId}`, {
            method: 'GET'
        }).then(response => response.blob())
        .then(file => {
            this.setState({imgURL: URL.createObjectURL(file)});
        });
    }

    toNetwork(){
        toast.dismiss();

        if(this.props.location.pathname === '/mynetwork'){
            window.location.reload();
        }

        else{
            this.props.history.push('/mynetwork');
        }
    }

    toNotifs(){
        toast.dismiss();

        if(this.props.location.pathname === '/notifications'){
            window.location.reload();
        }

        else{
            this.props.history.push('/notifications');
        }
    }

    render(){
        const {imgURL, firstName, lastName} = this.state;

        const {color, msg, data} = this.props;

        const clickToast = (data.type === 'FRIEND_REQUEST')? this.toNetwork: this.toNotifs;

        return(
            <div onClick = {clickToast} className ='toast-notif row' style={color? {color} : null}>
                <img src = {imgURL? imgURL: loading} className ='col-5' alt ='profile pic'/>
                
                <div className ='col-7 mt-2'>
                    <strong>{firstName} {lastName}</strong>
                    <span> {msg}</span>
                </div>
            </div>
        )
    }
}

export default withRouter(FriendRequestToast);