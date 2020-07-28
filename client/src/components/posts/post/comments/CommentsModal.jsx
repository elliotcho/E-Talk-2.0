import React, {Component} from 'react';
import UserComment from './UserComment';

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
        const {comments} = this.props;

        comments.sort((a, b) => b.createdAt - a.createdAt);

        this.setState({
            comments: [1,2,4,4,4,5,6]
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

        

        this.setState({commentContent: ''});
    }

    render(){
        const {postId} = this.props;

        const {commentContent} = this.state;

        const userComments = this.state.comments.map(comment =>
            <UserComment/>
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
                            {userComments}
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