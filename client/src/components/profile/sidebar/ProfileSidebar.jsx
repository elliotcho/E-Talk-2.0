import React from 'react';
import UserCard from './UserCard';
import ProfileMenu from './ProfileMenu';
import './ProfileSidebar.css';

function ProfileSidebar({profileId, uid}){
    return(
        <div className ='profile-sidebar'>
            <UserCard profileId = {profileId} uid = {uid}/>    
            <ProfileMenu profileId = {profileId} uid = {uid}/>                
        </div>
    )
}

export default ProfileSidebar;