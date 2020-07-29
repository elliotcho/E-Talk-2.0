import React, {Component} from 'react';
import UserComment from './UserComment';
import axios from 'axios';

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
            this.myCommentForm.dispatchEvent(new Event('submit'));
        }

        else{
           this.myComment.style.height = "";
           this.myComment.style.height = this.myComment.scrollHeight + 'px';
        }
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();

        let {commentContent} = this.state;
        let n = commentContent.length;

        if(commentContent.trim() === ""){
            commentContent = commentContent.substring(0, n-1);
            
            this.setState({commentContent});

            return;
        }

        const {postId, uid} = this.props;

        const config = {headers: {'content-type': 'application/json'}};

        axios.post('http://localhost:5000/posts/comment', {postId, uid, content: commentContent}, config).then(response =>{
            this.setState({comments: response.data});
        });

        this.setState({commentContent: ''});
        this.myComment.style.height = "";
    }

    render(){
        const {postId, uid} = this.props;

        const {commentContent} = this.state;

        const userComments = this.state.comments.map(comment =>
            <UserComment key={comment.uid} myId={uid} postId={postId} comment={comment}/>
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
                                        rows='1' 
                                        ref = {ele => this.myComment = ele}
                                        onKeyUp={this.pressEnter} 
                                        value = {commentContent}
                                        id = 'commentContent'
                                        onChange = {this.handleChange}
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