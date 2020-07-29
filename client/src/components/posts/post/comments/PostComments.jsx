import React from 'react';
import CommentsModal from './CommentsModal';
import './Comments.css';

function PostComments(props){
    const {uid, postId, formatCount, comments} = props;

    const commentsArray = JSON.parse(comments);

    return(
        <div className ='d-inline-block comments'>
            <i className ='fas fa-comment-alt' data-toggle ='modal' data-target ={`#commentsModalFor${postId}`}/>
                
            <span 
                className={commentsArray.length === 0? 'ml-1': 'ml-2'} 
                data-toggle ='modal' 
                data-target ={`#commentsModalFor${postId}`}
            >    
                {commentsArray.length === 0? null: formatCount(commentsArray.length)} 
                {commentsArray.length>1? " Comments": " Comment"}
            </span>

            <div className='modal fade' id= {`commentsModalFor${postId}`} data-backdrop='static'>
                <CommentsModal postId={postId} uid={uid} comments={comments}/>
            </div>
        </div>
    )
}  

export default PostComments;