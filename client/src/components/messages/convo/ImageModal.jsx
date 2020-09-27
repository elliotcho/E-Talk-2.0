import React, {Component} from 'react';
import {getMessageImage} from '../../../store/actions/messagesActions';
import loading from '../../../images/loading.jpg';

class ImageModal extends Component{
    constructor(){
        super();

        this.state = {
            imgURL: null
        }
    }

    
    async componentDidMount(){
        const {chatId, msgId} = this.props;

        const imgURL = await getMessageImage(chatId, msgId);

        this.setState({imgURL});
    }

    render(){
        const {msgId} = this.props;
        const {imgURL} = this.state;

        return(
            <div className ='msg-modal-dialog modal-dialog modal-dialog-centered'>
                <div className ='modal-content'>
                    <div className ='modal-header'>
                        <h5 className='mt-1'>
                            Image
                        </h5>
                    
                        <button id={`${msgId}-image`} className='close' data-dismiss='modal'>
                            <span>&times;</span>
                        </button>
                    </div>

                    <div className ='modal-body'>
                        <img src={imgURL? imgURL: loading} alt='message pic'/>
                    </div>
            </div>
        </div>
        )
    }
}

export default ImageModal;