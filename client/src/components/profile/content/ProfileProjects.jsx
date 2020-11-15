import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as profileActions from '../../../store/actions/profileActions';
import ProjectModal from './ProjectModal';
import {withAlert} from 'react-alert';
import moment from 'moment';

class ProfileProjects extends Component{
    constructor(){
        super();

        this.state = {
            projects: [],
            selectedId: null
        }

        this.addProject = this.addProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.editProject = this.editProject.bind(this);
    }

    async componentDidMount(){
        const {profileId} = this.props;

        const projects = await profileActions.getUserProjects(profileId);

        this.setState({projects});
    }

    async addProject(name, description){
        const {projects} = this.state;
        const {uid, alert} = this.props;

        if(name.trim().length === 0 || description.trim().length === 0){
            alert.error('Fields cannot be blank!');
            return;
        }

        const data = {name, description, uid};

        const newProject = await profileActions.addProject(data);
        projects.unshift(newProject);

        this.setState({projects});
    }

    async deleteProject(projectId){
        const {projects} = this.state;

        for(let i=0;i<projects.length;i++){
            if(projects[i]._id === projectId){
                projects.splice(i, 1);
                break;
            }
        }

        await profileActions.deleteProject(projectId);
        
        this.setState({projects});
    }

    async editProject(projectId, name, description){
        const {projects} = this.state;
        const {alert} = this.props;


        if(name.trim().length === 0 || description.trim().length === 0){
            alert.error('Fields cannot be blank!');
            return;
        }

        for(let i=0;i<projects.length;i++){
            if(projects[i]._id === projectId){

                projects[i].name = name;
                projects[i].description = description;

            }
        }

        const data = {name, description, projectId};

        await profileActions.updateProject(data);
        this.setState({ projects, selectedId: null });
    }

    render(){
        const {projects, selectedId} = this.state;
        const {uid, profileId} = this.props;

        const clickAdd = () => this.setState({selectedId: null})
        const clickEdit = (projectId) => this.setState({selectedId: projectId})

        return(
            <div className='projects-container'>
                {uid === profileId? 
                    (<div className='mb-5'>
                        <h2 className='d-inline-block'>
                            Projects
                        </h2>

                        <button 
                            className='add' 
                            data-toggle='modal' 
                            data-target='#project' 
                            onClick={clickAdd}
                        >
                            +
                        </button>
                    </div>): null
                }

                {projects.length > 0?
                    projects.map(project => 
                        <div key={project._id} className='project mb-5'>
                            <h3>{project.name}</h3>

                            <p className='text-muted'>
                                {moment(project.createdAt).calendar()}
                            </p>

                            <main>
                                {project.description}
                            </main>

                            {uid === profileId?
                                (<footer className = 'text-right'>
                                    <i 
                                        className='fas fa-edit mr-3' 
                                        data-toggle = 'modal'
                                        data-target = '#project'
                                        onClick = {() => clickEdit(project._id)}
                                    />

                                    <i 
                                        className='fas fa-trash-alt' 
                                        onClick={() => this.deleteProject(project._id)}
                                    />
                                </footer>) : null
                            }
                        </div>  
                    ) : null
                }

                {uid !== profileId && projects.length === 0? 
                    (<h1 className='text-center'>
                        User has not updated their projects
                    </h1>): null
                }

                <ProjectModal 
                    selectedId = {selectedId}
                    addProject = {this.addProject}
                    editProject = {this.editProject}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({uid: state.auth.uid});

export default connect(mapStateToProps)(withAlert()(ProfileProjects));