import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ProfileMenu extends Component{
    render(){
        const {profileId, type} = this.props;

        return(
            <div className ='profile-menu'>
                <ul className ='nav'>
                    <li className = {type === 'posts'? 'active': ''}>
                        <Link to = {`/profile/${profileId}/posts`}>
                            Posts
                        </Link>
                    </li>

                    <li className = {type === 'bio'? 'active': ''}>
                        <Link to = {`/profile/${profileId}/bio`}>
                            Bio
                        </Link>
                    </li>

                    <li className = {type === 'projects'? 'active': ''}>
                        <Link to = {`/profile/${profileId}/projects`}>
                            Projects
                        </Link>
                    </li>

                    <li className = {type === 'skills'? 'active': ''}>
                        <Link to = {`/profile/${profileId}/skills`}>
                            Skills
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ProfileMenu;