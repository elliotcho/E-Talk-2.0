import React from 'react';

function PostSettings({uid, ownerId, postId, deletePost}){
    const style = (uid === ownerId)?  {} : {display: 'none'};

    return(
        <div style = {style}>
            <div className = 'post-settings'>
                <i className ='fa fa-ellipsis-h'/>

                <div className ='dropdown-content'>
                    <div>
                        <div className = 'option' onClick = {() => {deletePost(postId)}}>
                            <i className ='fas fa-trash-alt'></i>
                            <span className ='ml-1'>Delete Post</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default PostSettings;