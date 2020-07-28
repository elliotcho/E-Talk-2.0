import React, {Component} from 'react';

class CommentsModal extends Component{
    constructor(){
        super();
        this.pressEnter = this.pressEnter.bind(this);
    }

    pressEnter(e){
        if(e.keyCode === 13 && e.shiftKey === false){
            this.myCommentForm.dispatchEvent(new Event('submit'));
        }

        else{
            this.myComment.style.height = "";
           this.myComment.style.height = this.myComment.scrollHeight + 'px';
        }
    }

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

                    <div className ='modal-body'>
                        <form ref ={ele => this.myCommentForm = ele}>
                            <textarea 
                                      rows='1' 
                                      ref = {ele => this.myComment = ele}
                                      onKeyUp={this.pressEnter} 
                            />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentsModal;