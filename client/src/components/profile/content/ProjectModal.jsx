import React, {Component} from 'react';
import { getProjectById } from '../../../store/actions/profileActions';

class ProjectModal extends Component{
    constructor(){
        super();

        this.state = {
            name: '',
            description: ''
        }

        this.loadProjectData = this.loadProjectData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveProject = this.saveProject.bind(this);
    }
    
    async componentDidMount(){
        const {selectedId} = this.props;

        if(selectedId){
            await this.loadProjectData(selectedId);
        } else {
            this.setState({
                name: '',
                description: ''
            });
        }
    }

    async componentDidUpdate(prevProps){
        const {selectedId} = this.props;

        if(selectedId && selectedId !== prevProps.selectedId){
             await this.loadProjectData(selectedId);
        } 

        else if(!selectedId && prevProps.selectedId){
            this.setState({
                name: '',
                description: ''
            });
        }
    }

    async loadProjectData(selectedId){
        const project = await getProjectById(selectedId);

        this.setState({
            name: project.name,
            description: project.description
        });
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    closeModal(){
        document.getElementById('close-project').click();
    }

    async saveProject(){
        const {name, description} = this.state;
        const {addProject, editProject, selectedId} = this.props;

        if(selectedId){
            await editProject(selectedId, name, description);
        } else{
            await addProject(name, description);
        }

        this.closeModal();
        this.setState({name: '', description: ''});
    }

    render(){
        const {name, description} = this.state;
        const {selectedId} = this.props;

        return(
            <div className='project-modal modal fade' id='project' data-backdrop='false'>
                <div className ='modal-dialog modal-dialog-centered'>
                    <div className ='modal-content'>
                        <div className ='modal-header'>
                            <h3>
                                {selectedId? 'Update Project' : 'New Project'}
                            </h3>
                       
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