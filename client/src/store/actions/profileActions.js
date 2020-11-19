import * as types from '../constants/actionTypes';
import axios from 'axios';

const config = {headers: {'content-type': 'application/json'}};

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

export const updateUserBio = async (content, uid) => {
    await axios.post('http://localhost:5000/users/bio', {content, uid}, config);
}

export const getUserSkills = async (uid) => {
    const response = await axios.get(`http://localhost:5000/users/skills/${uid}`);
    const skills = response.data;
    return skills;
}

export const addSkill = async (uid, newSkill) => {
     await axios.post('http://localhost:5000/users/skills', {uid, newSkill}, config);
}

export const deleteSkill = async (uid, idx) => {
    await axios.delete(`http://localhost:5000/users/skills/${uid}/${idx}`);
}

export const getProjectById = async (id) => {
    const response = await axios.get(`http://localhost:5000/projects/${id}`);
    const project = response.data;
    return project;
}

export const getUserProjects = async (uid) => {
    const response = await axios.get(`http://localhost:5000/projects/user/${uid}`);
    const projects = response.data;
    return projects;
}

export const addProject = async (data) => {
    const response = await axios.post('http://localhost:5000/projects', data, config);
    const newProject = response.data;
    return newProject;
}

export const deleteProject = async (projectId) => {
    await axios.delete(`http://localhost:5000/projects/${projectId}`);
}

export const updateProject = async (data) => {
    await axios.post('http://localhost:5000/projects/update', data, config);
}

export const changeName = async (data) => {
    const response = await axios.post('http://localhost:5000/users/change_name',data, config);
    const { msg } = response.data;
    return msg;
}

export const changePwd = async (data) => {
    const response = await axios.post('http://localhost:5000/users/change_pwd', data, config);
    const { msg } = response.data;
    return msg;
}

export const deleteUser = async (uid) => {
    const response = await axios.delete(`http://localhost:5000/users/${uid}`);
    const { msg } = response.data;
    return msg;
}