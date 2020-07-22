import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import loading from '../../images/loading.jpg';
import './UserCard.css';

class UserCard extends Component{
    constructor(){
        super();

        this.state = {
            imgURL: null
        }

        this.toProfile = this.toProfile.bind(this);
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

    render(){
        const {imgURL} = this.state;

        const {uid} = this.props;

        const {_id, firstName, lastName} = this.props.user;

        return(
            <div className = 'user-card card col-6 col-sm-4 col-lg-2'>
                <img src = {imgURL? imgURL: loading} className ='card-img-top' alt = 'profile pic'/>

                <div className ='card-body'>
                    <h5 className ='card-title text-center text-primary' onClick={()=>{this.toProfile(_id)}}>
                        {firstName} {lastName}
                    </h5>
                </div>

                {uid === _id? null: <div className ='card-footer text-center'>
                    <i className ='fas fa-user-plus'></i>
                </div>}
            </div>
        )
    }
}

export default withRouter(UserCard);