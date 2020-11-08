import React from 'react';

function PostSettings({uid, ownerId, postId, deletePost}){
    const style = (uid === ownerId)?  {} : {display: 'none'};

    const openEditModal = () => {
        document.getElementById('open-edit').click();
    }

    return(
        <div style = {style}>
            <div className = 'post-settings'>
                <i className ='fa fa-ellipsis-h'/>

                <div className ='dropdown-content'>
                    <div>
                        <div className = 'option' onClick = {() => {deletePost(postId)}}>
                            <i className ='fas fa-trash-alt'></i>
                            <span>Delete Post</span>
                        </div>

                        <div className = 'option' onClick={openEditModal}>
                            <i className ='fas fa-edit'></i>
                            <span>Edit Post</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default PostSettings;