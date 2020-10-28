import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserBio, updateUserBio} from '../../../store/actions/profileActions';

class ProfileBio extends Component{
    constructor(){
        super();

        this.state = {
            bio: 'Loading Bio...',
            text: '',
            editting: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.saveBio = this.saveBio.bind(this);
    }

    async componentDidMount(){
        const {profileId} = this.props;

        const bio = await getUserBio(profileId);

        this.setState({
            text: bio? bio: '',
            bio
        });
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    async saveBio(){
        const {text} = this.state;
        const {uid} = this.props;

        await updateUserBio(text, uid);

        this.setState({
            bio: text,
            editting: false
        });
    }

    render(){
        const {bio, text, editting} = this.state;
        const {profileId, uid} = this.props;

        const startEdit = () => {this.setState({editting: true});}
        const cancelEdit = () => {this.setState({editting: false});}

        return(
            <div className='bio'>
                {!editting? (bio? bio: <h1>User has no bio</h1>) : null}
             
                {profileId === uid? (editting?
                    (<div>
                        <textarea
                            id='text'
                            onChange={this.handleChange}
                            value={text}
                        />

                        <div className='btn-container'>
                            <button className='btn btn-secondary' onClick={cancelEdit}>
                                Close
                            </button>

                            <button className='btn btn-success' onClick={this.saveBio}>
                                Save
                            </button>
                        </div>
                    </div>) :
                    (<div className='btn-container'>
                        <button className='btn btn-success' onClick={startEdit}>
                            Edit Bio
                        </button>
                    </div>)
                ): null}
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