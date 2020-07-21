import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import ProfileSidebar from './sidebar/ProfileSidebar';
import PostList from '../posts/PostList';
import ProfileBio from './content/ProfileBio';
import './Profile.css';

class Profile extends Component{
    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){   
            window.location.reload();
        }
        
        window.scrollTo(0, 0);
    }

    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to='/'/>
        }

        const {
            id,
            type
        } = this.props.match.params;

        return(
                <div className ='container'>
                    <div className ='row profile'>
                        <section className ='col-md-3'>
                            <ProfileSidebar profileId = {id} uid = {uid}  type = {type}/>
                        </section>

                        <section className ='col-md-9'>
                            <div className ='profile-content'>
                                {type === 'posts'? <PostList profileId = {id}/> : null}
                                {type === 'bio'? <ProfileBio/>: null}
                            </div>
                        </section>
                    </div>
                </div>
            
        )
    }
}

export default withRouter(Profile);