import React, {Component} from 'react';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
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

    componentDidMount(){
        const commenterId = this.props.comment.uid;

        axios.get(`http://localhost:5000/users/${commenterId}`).then(response => {
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName
            });
        });

        fetch(`http://localhost:5000/users/profilepic/${commenterId}`, {
            method: 'GET'
        }).then(response => response.blob())
        .then(file => {
            this.setState({imgURL: URL.createObjectURL(file)});
        });
    }



    toProfile(){
        const commenterId = this.props.comment.uid;

        const {postId} = this.props;

        document.getElementById(`closeCommentsFor${postId}`).click();

       setTimeout(() =>{
           this.props.history.push(`/profile/${commenterId}/posts`)
       }, 500);
    }

    render(){
        // const ownerSettings = (
        //     <div>
        //         <div className = 'option' onClick = {() => {deletePost(postId)}}>
        //             <i className ='fas fa-trash-alt'></i>
        //             <span className ='ml-1'>Delete Post</span>
        //         </div>

        //         <div className = 'option'>
        //             <i className ='fas fa-edit'></i>
        //             <span className='ml-1'>Edit Post</span>
        //         </div>
        //     </div>
        // );

        const {createdAt, content} = this.props.comment;

        const {firstName, lastName, imgURL} = this.state;

        return(
            <div className ='user-comment'>
                <div className ='row'>
                    <div className ='col-2'>
                        <img src = {imgURL? imgURL: loading} alt ='profile pic'/>
                    </div>

                    <div className ='col-7 mt-1'>
                        <h5 className ='text-primary' onClick={this.toProfile}>{firstName} {lastName}</h5>
                        <p className ='text-muted'>{moment(createdAt).calendar()}</p>
                    </div>

                    <div className='col-3 text-right'>
                        <i className ='fa fa-ellipsis-h'/>
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