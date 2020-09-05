import React from 'react';
import {Link} from 'react-router-dom';

function ProfileMenu({profileId, type}){
    return(
        <div className ='profile-menu'>
            <ul className ='nav'>
                <li className = {type === 'posts'? 'active': ''}>
                    <Link to = {`/profile/${profileId}/posts`}>
                        Posts
                    </Link>
                </li>

                <li className = {type === 'friends'? 'active': ''}>
                    <Link to = {`/profile/${profileId}/friends`}>
                        Friends
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

export default ProfileMenu;