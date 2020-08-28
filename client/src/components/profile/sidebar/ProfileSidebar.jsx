import React from 'react';
import ProfileTop from './ProfileTop';
import ProfileMenu from './ProfileMenu';
import './ProfileSidebar.css';

function ProfileSidebar({profileId, uid, type}){
    return(
        <div className ='profile-sidebar'>
            <ProfileTop profileId = {profileId} uid = {uid}/>    
            <ProfileMenu profileId = {profileId} uid = {uid} type = {type}/>                
        </div>
    )
}

export default ProfileSidebar;