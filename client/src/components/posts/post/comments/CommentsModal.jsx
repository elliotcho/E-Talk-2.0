import React, {Component} from 'react';
import {createComment, deleteComment} from '../../../../store/actions/postActions';
import CreateComment from './CreateComment';
import UserComment from './UserComment';
import {io} from '../../../../App';

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

        const comments = await createComment(postId, uid, content);

        this.setState({
            comments
        });
    }    

    async deleteComment(commentId){
        if(!window.confirm("Are you sure you want to delete this comment?")){
            return;
        }

        const {
            uid,
            postId,
            updateCount
        } = this.props;

        updateCount(-1);

        io.emit('REMOVE_COMMENT', {
            postId, 
            senderId: uid
        });
    
        const comments = await deleteComment(postId, commentId);

        this.setState({
            comments
        });
    }

    render(){
        const {
            uid,
            postId,
            updateCount
        } = this.props;

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