import * as types from '../constants/actionTypes';
import axios from 'axios';

export const getNavbarInitials = (uid) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/users/${uid}`);
        const {firstName, lastName} = response.data;
        
        const initials = firstName[0].toUpperCase() + lastName[0].toUpperCase();

        dispatch({
            type: types.NAVBAR_INITIALS, 
            initials
        });
    }
}

export const getUserData = async (uid) =>{
    const response = await axios.get(`http://localhost:5000/users/${uid}`);
    return response.data;
}

export const changeProfilePic = async (uid, profilePic) =>{
    const formData = new FormData();

    formData.append('uid', uid);
    formData.append('profilePic', profilePic);

    const config = {headers: {'content-type': 'multipart/form-data'}};

    await axios.post('http://localhost:5000/users/profilepic', formData, config)
    window.location.reload();
}

export const getProfilePic = async (uid) =>{
    const response = await fetch(`http://localhost:5000/users/profilepic/${uid}`, {
        method: 'GET'
    });

    const file = await response.blob();

    return URL.createObjectURL(file);
}

export const getUserBio = async (uid) => {
    const response = await axios.get(`http://localhost:5000/users/bio/${uid}`);
    const {bio} = response.data;

    return bio;
}