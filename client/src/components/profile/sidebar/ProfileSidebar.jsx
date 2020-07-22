import React from 'react';
import ProfileCard from './ProfileCard';
import ProfileMenu from './ProfileMenu';
import './ProfileSidebar.css';

function ProfileSidebar({profileId, uid, type}){
    return(
        <div className ='profile-sidebar'>
            <ProfileCard profileId = {profileId} uid = {uid}/>    
            <ProfileMenu profileId = {profileId} uid = {uid} type = {type}/>                
        </div>
    )
}

export default ProfileSidebar;