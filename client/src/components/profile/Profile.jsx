import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import ProfileSidebar from './sidebar/ProfileSidebar';
import './Profile.css';

class Profile extends Component{
    componentDidUpdate(){
        window.location.reload();
    }

    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to='/'/>
        }

        const profileId = this.props.match.params.id;

        return(
                <div className ='container'>
                    <div className ='row profile'>
                        <section className ='col-md-3'>
                            <ProfileSidebar profileId = {profileId} uid = {uid}/>
                        </section>

                        <section className ='col-md-9'>
                            <div className ='profile-content'>
                                User related content....
                            </div>
                        </section>
                    </div>
                </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.auth.uid,
    }
}

export default withRouter(connect(mapStateToProps)(Profile));