import React, {Component} from 'react';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import {getUserData, getProfilePic} from '../../../../store/actions/profileActions';
import CommentSettings from './CommentSettings';
import loading from '../../../../images/loading.jpg';

class UserComment extends Component{
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
        const {commenterId} = this.props;

        const user = await getUserData(commenterId);

        const {
            firstName,
            lastName
        } = user;
        
        const imgURL = await getProfilePic(commenterId);

        this.setState({
            firstName,
            lastName,
            imgURL
        });
    }

    toProfile(){
        const {postId, commenterId} = this.props;

        document.getElementById(`closeCommentsFor${postId}`).click();

       setTimeout(() =>{
           this.props.history.push(`/profile/${commenterId}/posts`)
       }, 500);
    }

    render(){
        const {
            myId,
            commentId,
            commenterId,
            createdAt, 
            content,
            deleteComment
        } = this.props;

        const {
            firstName, 
            lastName, 
            imgURL
        } = this.state;

        return(
            <div className ='user-comment'>
                <div className ='row'>
                    <div className ='col-2'>
                        <img src = {imgURL? imgURL: loading} alt ='profile pic'/>
                    </div>

                    <div className ='col-7 mt-1'>
                        <h5 className ='text-primary' onClick={this.toProfile}>
                            {firstName} {lastName}
                        </h5>
                        
                        <p className ='text-muted'>
                            {moment(createdAt).calendar()}
                        </p>
                    </div>

                    <div className='col-3 text-right'>
                        <CommentSettings 
                            commentId = {commentId}
                            myId={myId} 
                            commenterId={commenterId}
                            deleteComment = {deleteComment}
                        />
                    </div>

                    <div className ='user-content col-12'>
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserComment);