import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as profileActions from '../../../store/actions/profileActions';
import ProjectModal from './ProjectModal';

class ProfileProjects extends Component{
    constructor(){
        super();

        this.state = {
            projects: []
        }
    }

    async componentDidMount(){
        const {profileId} = this.props;

        const projects = await profileActions.getUserProjects(profileId);

        this.setState({projects});
    }

    render(){
        const {projects} = this.state;
        const {uid, profileId} = this.props;

        return(
            <div className='projects-container'>
                {uid === profileId? 
                    (<button data-toggle='modal' data-target='#project'>
                        Create
                    </button>): null
                }

                {projects.length > 0?
                    projects.map(project => 
                        <div>

                        </div>
                    ) : null
                }

                {uid !== profileId && projects.length === 0? 
                    (<h1 className='text-center'>
                        User has not updated their projects
                    </h1>): null
                }

                <ProjectModal/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({uid: state.auth.uid});

export default connect(mapStateToProps)(ProfileProjects);