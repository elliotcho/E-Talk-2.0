import React, {Component} from 'react';

class CommentsModal extends Component{
    render(){
        const {postId} = this.props;

        return(
            <div className ='modal-dialog modal-dialog-centered'>
                <div className ='modal-content'>
                    <div className ='modal-header'>
                        <h5 className ='mt-2'>Comments</h5>
                        
                        <button id={`closeCommentsFor${postId}`} className='close' data-dismiss='modal'>
                            <span>&times;</span>
                        </button>
                    </div>

                    <div>
                      
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentsModal;