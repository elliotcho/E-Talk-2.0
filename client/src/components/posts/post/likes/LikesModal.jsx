import React from 'react';
import UserLike from './UserLike';

function LikesModal({likes, postId}){
    const userLikes = likes.map(like =>
        <UserLike 
            key={like} 
            uid ={like} 
            postId={postId}
        />
    );

    const modalId = `closeLikesFor${postId}`;

    return(
        <div className ='modal-dialog modal-dialog-centered'>
            <div className ='modal-content'>
                <div className ='modal-header'>
                    <h5 className ='mt-2'>
                        Post Liked By...
                    </h5>
                    
                    <button id= {modalId} className='close' data-dismiss='modal'>
                        <span>&times;</span>
                    </button>
                </div>

                <div className ='modal-body'>
                    {userLikes}
                </div>
            </div>
        </div>
    )
}

export default LikesModal;