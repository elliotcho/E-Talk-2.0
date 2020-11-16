import React, {Component} from 'react';
import './EditModal.css';

class EditModal extends Component{
    constructor(){
        super();

        this.state = {
            newContent: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    componentDidMount(){
        this.setState({newContent: this.props.content});
    }

    componentDidUpdate(prevProps){
        if(this.props.content !== prevProps.content){
            this.setState({newContent: this.props.content});
        }
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    closeModal(){
        const {content} = this.props;
        this.setState({newContent: content});

        document.getElementById('close-edit').click();
    }

    async saveChanges(){
        const{newContent} = this.state;
        const {editContent} = this.props;

        await editContent(newContent);
        document.getElementById('close-edit').click();
    }

    render(){
        const {newContent} = this.state;
        const {title} = this.props;

        let maxLength;

        if(this.props.maxLength){
            maxLength = this.props.maxLength
        } else{
            maxLength = '524288';
        }

        return(
            <div className='edit-modal modal fade' id='edit' data-backdrop='false'>
                <div className ='modal-dialog modal-dialog-centered'>
                    <div className ='modal-content'>
                        <div className ='modal-header'>
                            <h3>{title? title: 'Loading...'}</h3>
                       
                            <button className='close' onClick={this.closeModal}>
                                <span>&times;</span>
                            </button>

                            <button id='close-edit' data-dismiss='modal' style={{display: 'none'}}/>
                        </div>

                        <div className ='modal-body'>
                            <div className="form-group">
                                <textarea
                                    id= 'newContent'
                                    value = {newContent}
                                    onChange = {this.handleChange}
                                    maxLength = {maxLength}
                                />
                             </div>
                        </div>

                        <div className='modal-footer'>
                            <button className='btn btn-secondary' onClick={this.closeModal}>
                                Close
                            </button>
                          
                            <button className='btn btn-success' onClick={this.saveChanges}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }   
}

export default EditModal;