import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { addProject } from '../../../store/actions/profileActions';

class ProjectModal extends Component{
    constructor(){
        super();

        this.state = {
            name: '',
            description: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveProject = this.saveProject.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    closeModal(){
        document.getElementById('close-project').click();
    }

    async saveProject(){
        const {name, description} = this.state;
        const {addProject} = this.props;

        await addProject(name, description);
        this.closeModal();

        this.setState({
            name: '',
            description: ''
        })
    }

    render(){
        const {name, description} = this.state;

        return(
            <div className='project-modal modal fade' id='project' data-backdrop='false'>
                <div className ='modal-dialog modal-dialog-centered'>
                    <div className ='modal-content'>
                        <div className ='modal-header'>
                            <h3>New Project</h3>
                       
                            <button className='close' onClick={this.closeModal}>
                                <span>&times;</span>
                            </button>

                            <button 
                                id='close-project' 
                                data-dismiss='modal' 
                                style={{display: 'none'}}
                            />
                        </div>

                        <div className ='modal-body'>
                            <input 
                                type = 'text'
                                id = 'name'
                                placeholder = 'Project Name Here...'
                                value = {name}
                                onChange = {this.handleChange}
                            />

                            <textarea
                                id = 'description'
                                placeholder = 'Project Description Here...'
                                value = {description}
                                onChange = {this.handleChange}
                            />
                        </div>

                        <div className='modal-footer'>
                            <button className='btn btn-secondary' onClick={this.closeModal}>
                                Close
                            </button>
                          
                            <button className='btn btn-danger' onClick={this.saveProject}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }   
}

export default ProjectModal;