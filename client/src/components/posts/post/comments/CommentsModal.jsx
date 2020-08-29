import React, {Component} from 'react';
import {createComment, deleteComment} from '../../../../store/actions/postActions';
import UserComment from './UserComment';
import {io} from '../../../../App';

class CommentsModal extends Component{
    constructor(){
        super();

        this.state = {
            commentContent: '',
            comments: []
        }

        this.pressEnter = this.pressEnter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    componentDidMount(){
        const comments = JSON.parse(this.props.comments);

        comments.sort((a, b) => b.createdAt - a.createdAt);

        this.setState({
            comments
        });
    }

    pressEnter(e){
        if(e.keyCode === 13 && e.shiftKey === false){
            e.preventDefault();
            this.myCommentForm.dispatchEvent(new Event('submit'));
        }

        else{
           setTimeout(()=>{
            this.myComment.style.height = "";
            this.myComment.style.height = this.myComment.scrollHeight + 'px';
           }, 0);
        }

        if(this.myComment.scrollHeight > 200){
            this.myComment.style.overflow = 'auto';
        }

        else{
            this.myComment.style.overflow = 'hidden';
        }
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();

        let {commentContent} = this.state;
        let n = commentContent.length;

        if(commentContent.trim() === ""){
            commentContent = commentContent.substring(0, n-1);
            
            this.setState({commentContent});

            return;
        }

        const {
            postId, 
            uid, 
            updateCommentsCount
        } = this.props;

        io.emit('COMMENT_ON_POST', {postId, senderId: uid});

        const data = await createComment(postId, uid, commentContent);
        this.setState({comments: data});

        updateCommentsCount(1);

        this.setState({commentContent: ''});
        this.myComment.style.height = "";
    }

    async deleteComment(commentId){
        if(!window.confirm("Are you sure you want to delete this comment?")){
            return;
        }

        const {postId, uid, updateCommentsCount} = this.props;

        io.emit('REMOVE_COMMENT', {postId, senderId: uid});

        updateCommentsCount(-1);
    
        const data = await deleteComment(postId, commentId);
        this.setState({comments: data});
    }

    render(){
        const {postId, uid} = this.props;

        const {commentContent} = this.state;

        const userComments = this.state.comments.map(comment =>
            <UserComment 
                key={comment.uid} 
                myId={uid} 
                postId={postId} 
                comment={comment}
                deleteComment = {this.deleteComment}
            />
        );

        return(
            <div className ='modal-dialog modal-dialog-centered'>
                <div className ='modal-content'>
                    <div className ='modal-header'>
                        <h5 className ='mt-2'>Comments</h5>
                        
                        <button id={`closeCommentsFor${postId}`} className='close' data-dismiss='modal'>
                            <span>&times;</span>
                        </button>
                    </div>

                    <div className ='modal-body' onSubmit={this.handleSubmit}>
                        <div className ='comments-container'>
                            {userComments.length === 0? <h4 className ='no-comments'>No Comments Available</h4>: 
                            userComments}
                        </div>

                        <div className ='comment-form'> 
                            <form ref ={ele => this.myCommentForm = ele}>
                                <textarea 
                                        className = 'form-control'
                                        rows='1' 
                                        ref = {ele => this.myComment = ele}
                                        onKeyDown={this.pressEnter} 
                                        value = {commentContent}
                                        id = 'commentContent'
                                        onChange = {this.handleChange}
                                        placeholder = 'Write a comment...'
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentsModal;