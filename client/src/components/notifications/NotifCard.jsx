import React, {Component} from 'react';
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

    render(){
        const {firstName, lastName, imgURL} = this.state;

        const {msg} = this.props.notif;

        return(
            <div className ='row notif-card mb-3'>
                <div className ='col-4'>
                    <img src={imgURL? imgURL: loading} className='float-left' alt='profile pic'/>
                </div>

                <div className ='col-8'>
                    <p>
                        <strong>{firstName} {lastName} </strong> 
                        {msg}
                    </p>

                    <div className ='notif-date'>
                        September 30, 2018
                    </div>
                </div>
            </div>
        )
    }
}

export default NotifCard;