import React, {Component} from 'react';

class CommentSettings extends Component{
    render(){
        const {
            commentId, 
            myId, 
            commenterId, 
            deleteComment
        } = this.props;

        const style = (myId === commenterId) ? {} : {display: 'none'};

       return(
            <div style = {style}>
                <div className ='comment-settings'>
                    <i className ='fa fa-ellipsis-h'/>

                    <div className ='dropdown-content'>
                        <div>
                            <div className = 'option' onClick = {() => {deleteComment(commentId)}}>
                                <i className ='fas fa-trash-alt'></i>
                                <span className ='ml-1'>Delete</span>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
       )
    }
}

export default CommentSettings;