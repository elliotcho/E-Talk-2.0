import React, {Component} from 'react';
import CommentsModal from './CommentsModal';
import './Comments.css';

class PostComments extends Component{
    constructor(){
        super();
        
        this.state ={
            commentsCount: 0
        }

        this.updateCount = this.updateCount.bind(this);
    }

    componentDidMount(){
        const comments = JSON.parse(this.props.comments);

        this.setState({
            commentsCount: comments.length
        });
    }

    updateCount(num){
        const {commentsCount} = this.state;

        this.setState({
            commentsCount: commentsCount + num
        });
    }

    render(){
        const {commentsCount} = this.state;
        const {uid, postId, formatCount, comments} = this.props;

        const iconMargin = (commentsCount === 0)? 'ml-1': 'ml-2';
    
        return(
            <div className ='d-inline-block comments'>
                <i 
                    className ='fas fa-comment-alt' 
                    data-toggle ='modal' 
                    data-target ={`#commentsModalFor${postId}`}
                />
                    
                <span className ={iconMargin} data-toggle ='modal' data-target ={`#commentsModalFor${postId}`}>    
                    {commentsCount === 0? 
                        null: 
                        formatCount(commentsCount)
                    } 
                    
                    {commentsCount > 1? 
                        " Comments": 
                        " Comment"
                    }
                </span>
    
                <div className='modal fade' id= {`commentsModalFor${postId}`} data-backdrop='static'>
                    <CommentsModal 
                        postId={postId} 
                        uid={uid} 
                        comments={comments}
                        updateCount = {this.updateCount}
                    />
                </div>
            </div>
        )
    }
}

export default PostComments;