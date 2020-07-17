import axios from 'axios';

export const getUserInfo = (uid) =>{
    return (dispatch) =>{
        axios.get(`http://localhost:5000/users/${uid}`).then(response =>{
            const {firstName, lastName} = response.data;
            dispatch({type: "USER_INFO", firstName, lastName});
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