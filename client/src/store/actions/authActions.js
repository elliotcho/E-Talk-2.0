import * as types from '../constants/actionTypes';
import axios from 'axios';

const config={headers: {'content-type': 'application/json'}};

//user login: updates uid in global state
export const login = (credentials) =>{
    return async (dispatch) =>{
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
        const {firstName, lastName} = credentials;

        if(!verifyName(firstName) || !verifyName(lastName)){
            alert("Invalid name: First name and last name should only contain letters!");
            return;
        }

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

const verifyName = (name) => {
    let valid = true;

    for(let i=0;i<name.length;i++){
        if(name[i].toLowerCase() === name[i].toUpperCase()){
            valid = false;
            break;
        }
    }

    return valid;
}