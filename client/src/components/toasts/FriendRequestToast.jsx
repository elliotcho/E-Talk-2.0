import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import loading from '../../images/loading.jpg';
import axios from 'axios';
import './Toasts.css';

class FriendRequestToast extends Component{
    constructor(){
        super();

        this.state = {
            firstName: 'Loading...', 
            lastName: 'User...',
            imgURL: null
        }

        this.toNetwork = this.toNetwork.bind(this);
    }

    componentDidMount(){
        const {_id} = this.props.data;

        axios.get(`http://localhost:5000/users/${_id}`).then(response => {
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName
            });
        });

        fetch(`http://localhost:5000/users/profilepic/${_id}`, {
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

    render(){
        const {imgURL, firstName, lastName} = this.state;

        return(
            <div onClick = {this.toNetwork} className ='fr-toast row'>
                <img src = {imgURL? imgURL: loading} className ='col-5' alt ='profile pic'/>
                
                <div className ='col-7 mt-2'>
                    <strong>{firstName} {lastName}</strong>
                    <span> sent you a friend request!</span>
                </div>
            </div>
        )
    }
}

export default withRouter(FriendRequestToast);