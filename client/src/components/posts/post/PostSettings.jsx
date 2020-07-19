import React, {Component} from 'react';

class PostSettings extends Component{
    render(){
        const {uid, ownerId, postId, deletePost} = this.props;

        const ownerSettings = (
            <div>
                <div className = 'option' onClick = {() => {deletePost(postId)}}>
                    <i className ='fas fa-trash-alt'></i>
                    <span className ='ml-1'>Delete Post</span>
                </div>

                <div className = 'option'>
                    <i className ='fas fa-edit'></i>
                    <span className='ml-1'>Edit Post</span>
                </div>
            </div>
        );

        return(
            <div>
                <div className = 'post-settings'>
                    <i className ='fa fa-ellipsis-h'/>

                    <div className ='dropdown-content'>
                       {uid === ownerId? ownerSettings: null}
                    </div>
                </div>
            </div>
        )
    }
}

export default PostSettings;