import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class ProjectModal extends Component{
    render(){
        return(
            <div className='project-modal modal fade' id='project' data-backdrop='false'>
                <div className ='modal-dialog modal-dialog-centered'>
                    <div className ='modal-content'>
                        <div className ='modal-header'>
                            <h3>New Project</h3>
                       
                            <button className='close' data-dismiss='modal'>
                                <span>&times;</span>
                            </button>
                        </div>

                        <div className ='modal-body'>
                       
                        </div>

                        <div className='modal-footer'>
                            <button className='btn btn-secondary'>
                                Close
                            </button>
                          
                            <button className='btn btn-success'>
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