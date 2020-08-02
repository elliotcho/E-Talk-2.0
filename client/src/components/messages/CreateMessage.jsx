import React, {Component} from 'react';

class CreateMessage extends Component{
    render(){
        return(
            <div className ='create-msg'>
                <form ref = {ele => this.myMessageForm = ele}>
                    <textarea
                        className ='form-control'
                        rows ='1'
                        ref = {ele =>this.myMessage = ele}
                        placeholder ='Type a message...'
                    />
                </form>
            </div>
        )
    }
}

export default CreateMessage;