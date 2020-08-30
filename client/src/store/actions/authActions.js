import * as types from '../constants/actionTypes';
import axios from 'axios';

//user login: updates uid in global state
export const login = (credentials) =>{
    return async (dispatch) =>{
        const config={headers: {'content-type': 'application/json'}};

        const response = await axios.post('http://localhost:5000/users/login', {...credentials}, config)
        const {msg, uid} = response.data;
    
        if(msg === 'Success'){
            dispatch({
                type: types.LOGIN_SUCCESS, 
                uid
            });
        }

        else{
            alert(msg);
        }
    }
}

//user sign up: updates uid in global state
export const signUp = (credentials) =>{
    return async (dispatch) =>{
        const config={headers: {'content-type': 'application/json'}};

        const response = await axios.post('http://localhost:5000/users/signup', {...credentials}, config);
        const {msg, uid} = response.data;

        if(msg === 'Success'){
            dispatch({
                type: types.LOGIN_SUCCESS, 
                uid
            });
        }

        else{
            alert(msg);
        }
    }
}