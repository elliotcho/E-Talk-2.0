import React from 'react';
import ProfileInfo from './ProfileInfo';
import ProfileMenu from './ProfileMenu';
import './ProfileSidebar.css';

function ProfileSidebar({profileId, uid, type}){
    return(
        <div className ='profile-sidebar'>
            <ProfileInfo profileId={profileId} uid={uid}/>    
            <ProfileMenu profileId={profileId} uid={uid} type={type}/>                
        </div>
    )
}

export default ProfileSidebar;