import React, {Component} from 'react';
import CommentsModal from './CommentsModal';
import './Comments.css';

class PostComments extends Component{
    constructor(){
        super();
        
        this.state ={
            commentsCount: 0
        }

        this.updateCommentsCount = this.updateCommentsCount.bind(this);
    }

    componentDidMount(){
        this.setState({commentsCount: JSON.parse(this.props.comments).length});
    }

    updateCommentsCount(num){
        const {commentsCount} = this.state;

        this.setState({
            commentsCount: commentsCount + num
        });
    }

    render(){
        const {uid, postId, formatCount, comments} = this.props;

        const {commentsCount} = this.state;
    
        return(
            <div className ='d-inline-block comments'>
                <i className ='fas fa-comment-alt' data-toggle ='modal' data-target ={`#commentsModalFor${postId}`}/>
                    
                <span 
                    className={commentsCount === 0? 'ml-1': 'ml-2'} 
                    data-toggle ='modal' 
                    data-target ={`#commentsModalFor${postId}`}
                >    
                    {commentsCount === 0? null: formatCount(commentsCount)} 
                    {commentsCount>1? " Comments": " Comment"}
                </span>
    
                <div className='modal fade' id= {`commentsModalFor${postId}`} data-backdrop='static'>
                    <CommentsModal 
                        postId={postId} 
                        uid={uid} 
                        comments={comments}
                        updateCommentsCount = {this.updateCommentsCount}
                    />
                </div>
            </div>
        )
    }
}

export default PostComments;