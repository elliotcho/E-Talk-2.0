import React, {Component} from 'react';

class CommentSettings extends Component{
    render(){
        const {commentId, myId, commenterId, deleteComment} = this.props;

       return(
        <div>
            <div className ='comment-settings'>
                <i className ='fa fa-ellipsis-h'/>

                <div className ='dropdown-content'>
                    {myId === commenterId? 
                    (
                        <div>
                            <div className = 'option' onClick = {() => {deleteComment(commentId)}}>
                                <i className ='fas fa-trash-alt'></i>
                                <span className ='ml-1'>Delete</span>
                            </div>
        
                            <div className = 'option'>
                                <i className ='fas fa-edit'></i>
                                <span className='ml-1'>Edit</span>
                            </div>
                        </div>
                    ): null}
                </div>
            </div> 
        </div>
       )
    }
}

export default CommentSettings;