import axios from 'axios';

export const getUserInfo = (uid) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/users/${uid}`);
        
        const {firstName, lastName} = response.data;

        dispatch({
            type: "USER_INFO", 
            firstName, 
            lastName
        });
    }
}

export const changeProfilePic = (uid, profilePic) =>{
    return () =>{
        const formData = new FormData();

        formData.append('uid', uid);
        formData.append('profilePic', profilePic);

        const config = {headers: {'content-type': 'multipart/form-data'}};

        axios.post('http://localhost:5000/users/profilepic', formData, config)
        .then(() => {window.location.reload();});
    }
}

export const getProfilePic = async (uid) =>{
    const response = await fetch(`http://localhost:5000/users/profilepic/${uid}`, {
        method: 'GET'
    });

    const file = await response.blob();

    return URL.createObjectURL(file);
}