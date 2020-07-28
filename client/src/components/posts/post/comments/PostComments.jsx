import React, {Component} from 'react';
import CommentsModal from './CommentsModal';
import './Comments.css';

class PostComments extends Component{
    render(){
        const {postId, formatCount, comments} = this.props;

        return(
            <div className ='d-inline-block comments'>
                <i className ='fas fa-comment-alt' data-toggle ='modal' data-target ={`#commentsModalFor${postId}`}/>
                
                <span 
                      className={comments.length === 0? 'ml-1': 'ml-2'} 
                      data-toggle ='modal' 
                      data-target ={`#commentsModalFor${postId}`}
                >    
                    {comments.length === 0? null: formatCount(comments)} 
                    {comments.length>1? " Comments": " Comment"}
                </span>

                <div className='modal fade' id= {`commentsModalFor${postId}`}>
                      <CommentsModal postId={postId}/>
                </div>
            </div>
        )
    }
}  

export default PostComments;