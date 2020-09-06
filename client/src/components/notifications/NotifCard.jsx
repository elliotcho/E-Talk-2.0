import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getUserData, getProfilePic} from '../../store/actions/profileActions';
import {getPost} from '../../store/actions/postActions';
import loading from '../../images/loading.jpg';
import moment from 'moment';

class NotifCard extends Component{
    constructor(){
        super();

        this.state = {
            firstName: 'Loading...',
            lastName: 'User...',
            imgURL: null, 
            content: null,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount(){
        const {senderId, postId} = this.props.notif;

        const user = await getUserData(senderId);
        const imgURL = await getProfilePic(senderId);
    
        if(postId){
           const post = await getPost(postId);
           const {content} = post;
           this.setState({content});
        }

        this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            imgURL
        });
    }

    handleClick(){
        const {senderId, postId, type} = this.props.notif;

        if(type === 'ACCEPT_REQUEST'){
            this.props.history.push(`/profile/${senderId}/posts`);
        }     

        else if(type === 'LIKE_POST' || type === 'POST_COMMENT'){
            this.props.history.push(`/post/${postId}`);
        }
    }

    render(){
        const {firstName, lastName, imgURL, content} = this.state;
        const {msg, date, type} = this.props.notif;

        return(
            <div className ='row notif-card mb-3' onClick = {this.handleClick}>
                <div className ='col-4'>
                    <img 
                        src={imgURL? imgURL: loading} 
                        className='float-left' 
                        alt='profile pic'
                    />
                </div>

                <div className ='col-8'>
                    <p>
                        <strong>{firstName} {lastName} </strong> 
                        {msg} 
                        {content? ` ${content.substring(0, 30)}...`: null}
                    </p>

                    <div className ='notif-date'>
                        {moment(date).calendar()}

                        {type === 'LIKE_POST'? 
                            (<span className='heart text-danger ml-3'> 
                                &hearts;
                            </span>): type === 'POST_COMMENT'?
                            (<i className='fas fa-comment-alt ml-3'/>):
                            null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(NotifCard);