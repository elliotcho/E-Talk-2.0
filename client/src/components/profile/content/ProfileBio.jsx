import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserBio, updateUserBio} from '../../../store/actions/profileActions';
import EditModal from '../../layout/EditModal';

class ProfileBio extends Component{
    constructor(){
        super();

        this.state = {
            bio: null
        }

        this.editContent = this.editContent.bind(this);
    }

    async componentDidMount(){
        const {profileId} = this.props;

        const bio = await getUserBio(profileId);

        this.setState({bio});
    }

    async editContent(newContent){
        const {uid} = this.props;

        await updateUserBio(newContent, uid);

        this.setState({bio: newContent});
    }

    render(){
        const {bio} = this.state;
        const {profileId, uid} = this.props;

        const openEditModal = () => {
            document.getElementById('open-edit').click();
        }

        return(
            <div className='bio'>
                {bio? 
                    (<p>
                        {bio}
                    </p>): 
                    (<h1>
                        User has no bio
                    </h1>)
                }

                <button 
                    id='open-edit' 
                    data-toggle='modal' 
                    data-target='#edit'
                    style = {{display: 'none'}}
                />

                {uid === profileId?
                    (<div className='text-center my-3'>
                        <button className='btn btn-lg btn-primary' onClick={openEditModal}>
                            <i className ='fas fa-edit mr-2'/>
                            
                            <span>
                                Edit Bio
                            </span>
                        </button>
                    </div>) : null
                }

                <EditModal
                    title='Edit your bio'
                    content = {bio? bio: ''}
                    editContent = {this.editContent}
                />
            </div>
        )
    }
}   

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(ProfileBio);