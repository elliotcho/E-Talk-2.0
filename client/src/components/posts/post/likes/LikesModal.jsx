import React from 'react';
import UserLike from './UserLike';

function LikesModal(props){
    const userLikes = props.likes.map(like =>
        <UserLike uid ={like}/>
    );

    return(
        <div className ='modal-dialog modal-dialog-centered'>
            <div className ='modal-content'>
                <div className ='modal-header'>
                    <h5 className ='mt-2'>Post Liked By...</h5>
                    <button className ='close' data-dismiss ='modal'>
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