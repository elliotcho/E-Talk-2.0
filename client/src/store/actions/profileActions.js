import axios from 'axios';

export const getUserInfo = (uid) =>{
    return (dispatch) =>{
        const config = {headers: {'content-type': 'application/json'}};

        axios.post('http://localhost:5000/userinfo', {uid}, config).then(response =>{
            const {firstName, lastName} = response.data;
            dispatch({type: "USER_INFO", firstName, lastName});
        });
    }
}