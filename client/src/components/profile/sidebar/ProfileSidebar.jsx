import React from 'react';
import UserCard from './UserCard';
import ProfileMenu from './ProfileMenu';
import './ProfileSidebar.css';

function ProfileSidebar({profileId, uid, type}){
    return(
        <div className ='profile-sidebar'>
            <UserCard profileId = {profileId} uid = {uid}/>    
            <ProfileMenu profileId = {profileId} uid = {uid} type = {type}/>                
        </div>
    )
}

export default ProfileSidebar;