import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserBio} from '../../../store/actions/profileActions';

class ProfileBio extends Component{
    constructor(){
        super();

        this.state = {
            bio: 'Loading Bio...'
        }
    }

    async componentDidMount(){
        const {uid} = this.props;

        const bio = await getUserBio(uid);

        this.setState({bio});
    }

    render(){
        return(
            <div>
                <form>
                    <textarea/>
                    <button>Edit Bio</button>
                </form>
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