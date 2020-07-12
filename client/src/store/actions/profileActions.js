import axios from 'axios';

export const getUserInfo = (uid) =>{
    return (dispatch) =>{
        axios.get(`http://localhost:5000/users/${uid}`).then(response =>{
            const {firstName, lastName} = response.data;
            dispatch({type: "USER_INFO", firstName, lastName});
        });
    }
}