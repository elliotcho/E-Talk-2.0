import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getUserData, getProfilePic} from '../../../../store/actions/profileActions';
import loading from '../../../../images/loading.jpg';

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

    async componentDidMount(){
        const {uid} = this.props;

        const user = await getUserData(uid);

        const {
            firstName,
            lastName
        } = user;

        const imgURL = await getProfilePic(uid);

        this.setState({
            firstName,
            lastName,
            imgURL
        });
    }

    toProfile(){
        const {uid, postId} = this.props;

        document.getElementById(`closeLikesFor${postId}`).click();

       setTimeout(() =>{
           this.props.history.push(`/profile/${uid}/posts`)
       }, 500);
    }

    render(){
        const {
            firstName, 
            lastName, 
            imgURL
        } = this.state; 

        return(
            <div className ='user-like'>
                <img 
                    src={imgURL? imgURL: loading} 
                    onClick = {this.toProfile} 
                    alt ='profile pic'
                />

                <h4 className ='text-primary d-inline-block ml-4' onClick = {this.toProfile}>
                    {firstName} {lastName}
                </h4>
            </div>
        )
    }
}

export default withRouter(UserLike);