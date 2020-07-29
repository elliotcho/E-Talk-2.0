import React, {Component} from 'react';
import PostSettings from './PostSettings';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import loading from '../../../images/loading.jpg';

class PostHeader extends Component{
    constructor(){
        super();
        
        this.state = {
            firstName: 'Loading',
            lastName: 'User...', 
            imgURL: null
        }

        this.toOwnerProfile = this.toOwnerProfile.bind(this);
        this.toPostDetails = this.toPostDetails.bind(this);
    }

    componentDidMount(){
        const {ownerId} = this.props;

        axios.get(`http://localhost:5000/users/${ownerId}`).then(response => {
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName
            });
        });

        fetch(`http://localhost:5000/users/profilepic/${ownerId}`, {
            method: 'GET'
        }).then(response => response.blob())
        .then(file => {
            this.setState({imgURL: URL.createObjectURL(file)});
        });
    }

    toOwnerProfile(){
        this.props.history.push(`/profile/${this.props.ownerId}/posts`);
    }

    toPostDetails(){
        const {postId} = this.props;

        if(this.props.location.pathname !== `/post/${postId}`){
            this.props.history.push(`/post/${postId}`);
        }
    }

    render(){
        const {firstName, lastName, imgURL} = this.state;

        const {uid, ownerId, profileId, postId, createdAt, deletePost} = this.props;

        const headerColumns = (profileId !== null)? 'col-7 col-sm-8 col-md-8 col-lg-9':  'col-8 col-sm-9';

        return(
            <header className ='mb-3 row'>
                 <div className='ml-2'> 
                    <img src={imgURL? imgURL: loading} alt='profile pic' onClick = {this.toOwnerProfile}/>
                 </div>

                <div className = {headerColumns}>
                    <h3 className='text-primary mt-2' onClick = {this.toOwnerProfile}>
                        {firstName} {lastName}
                    </h3>

                    <p className='text-muted' onClick ={this.toPostDetails}>
                        {moment(createdAt).calendar()}
                    </p>
                </div>

                <div>
                    <PostSettings 
                        uid = {uid}
                        ownerId = {ownerId}
                        postId = {postId}
                        deletePost = {deletePost}
                    />
                </div>
            </header>
        )
    }
}

export default withRouter(PostHeader);