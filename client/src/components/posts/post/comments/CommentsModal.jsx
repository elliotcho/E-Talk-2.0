import React, {Component} from 'react';
import {createComment, deleteComment} from '../../../../store/actions/postActions';
import CreateComment from './CreateComment';
import UserComment from './UserComment';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class CommentsModal extends Component{
    constructor(){
        super();

        this.state = {
            comments: []
        }

        this.createComment = this.createComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    componentDidMount(){
        const comments = JSON.parse(this.props.comments);

        comments.sort((a, b) => b.createdAt - a.createdAt);

        this.setState({
            comments
        });
    }

    async createComment(content){
        const {uid, postId} = this.props;

        const data = await createComment(postId, uid, content);
        const {comments} = data;

        this.setState({comments});

        return data;
    }    

    async deleteComment(commentId){
        const {uid, postId, updateCount} = this.props;

        const confirmDeleteComment = async () => {
            updateCount(-1);
        
            const comments = await deleteComment(uid, postId, commentId);
    
            this.setState({comments});
        }

        confirmAlert({
            title: 'E-Talk',
            message: 'Are you sure you want to this comment?',
            buttons: [
                {label: 'Yes', onClick: confirmDeleteComment},
                {label: 'No', onClick: () => {return;}}
            ]
        });
    }

    render(){
        const {uid, postId, updateCount} = this.props;

        const comments = this.state.comments.map(comment =>
            <UserComment 
                key={comment._id} 
                myId={uid} 
                postId={postId} 
                commentId = {comment._id}
                commenterId = {comment.uid}
                createdAt = {comment.createdAt}
                content = {comment.content}
                deleteComment = {this.deleteComment}
            />
        );

        const modalId = `closeCommentsFor${postId}`;

        return(
            <div className ='modal-dialog modal-dialog-centered'>
                <div className ='modal-content'>
                    <div className ='modal-header'>
                        <h5 className ='mt-2'>
                            Comments
                        </h5>
                        
                        <button id={modalId} className='close' data-dismiss='modal'>
                            <span>&times;</span>
                        </button>
                    </div>

                    <div className ='modal-body'>
                        <div className ='comments-container'>
                            {comments.length === 0? 
                                (<h4 className ='no-comments'>
                                    No Comments Available
                                </h4>): 
                                comments
                            }
                        </div>

                        <CreateComment
                            uid = {uid}
                            postId = {postId}
                            updateCount = {updateCount}
                            createComment = {this.createComment}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentsModal;