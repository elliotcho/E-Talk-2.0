import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {changeQueryToProfile, clearQuery} from '../../store/actions/searchActions';
import ProfileSidebar from './sidebar/ProfileSidebar';
import PostList from '../posts/PostList';
import ProfileBio from './content/ProfileBio';
import ProfileSkills from './content/ProfileSkills';
import Friends from './content/Friends';
import ProfileProjects from './content/ProfileProjects';
import './Profile.css';

class Profile extends Component{
    componentDidMount(){
        const {dispatch} = this.props; 
        const {id} = this.props.match.params;
         
        dispatch(changeQueryToProfile(id));
    }

    componentDidUpdate(prevProps){
        const {id} = this.props.match.params;

        if(prevProps.match.params.id !== id){   
            window.location.reload();
        }
        
        window.scrollTo(0, 0);
    }

    componentWillUnmount(){
        this.props.dispatch(clearQuery());
    }

    render(){
        const {uid} = this.props;
        const {id, type} = this.props.match.params;

        return(
                <div className ='container'>
                    <div className ='row profile'>
                        <section className ='col-md-3'>
                            <ProfileSidebar 
                                profileId = {id} 
                                uid = {uid}  
                                type = {type}
                            />
                        </section>

                        <section className ='col-md-9'>
                            <div className ='profile-content'>
                                {type === 'posts'? <PostList profileId={id}/> : null}
                                {type === 'friends'? <Friends profileId={id}/>: null}
                                {type === 'bio' ? <ProfileBio profileId={id}/>: null}
                                {type === 'skills' ? <ProfileSkills profileId={id}/>: null}
                                {type === 'projects' ? <ProfileProjects profileId={id}/>: null}
                            </div>
                        </section>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        uid: state.auth.uid
    }
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));