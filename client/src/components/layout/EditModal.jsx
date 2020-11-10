import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
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

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    closeModal(){
        const confirmDelete = () => {
            const {content} = this.props;
            this.setState({newContent: content});

            document.getElementById('close-edit').click();
        }

        if(this.props.content === this.state.newContent){
            confirmDelete();
        }

        else{    
            confirmAlert({
                title: 'E-Talk',
                message: 'Are you sure you want to exit? Any changes you have made will not be saved!',
                buttons: [
                    {label: 'Yes', onClick: confirmDelete},
                    {label: 'No', onClick: () => {return;}}
                ]
            }); 
        }
    }

    async saveChanges(){
        const{newContent} = this.state;
     
        const confirmSave = async () => {
            const {editContent} = this.props;

            await editContent(newContent);

            document.getElementById('close-edit').click();
        }

        confirmAlert({
            title: 'E-Talk',
            message: 'Are you sure you want to save your changes? Previous changes will be overwritten!',
            buttons: [
                {label: 'Yes', onClick: confirmSave},
                {label: 'No', onClick: () => {return;}}
            ]
        });
    }

    render(){
        const {newContent} = this.state;
        const {title} = this.props;

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