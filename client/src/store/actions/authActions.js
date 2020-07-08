import axios from 'axios';

export const login = (credentials) =>{
    return (dispatch) =>{
        const config={headers: {'content-type': 'application/json'}};

        axios.post('http://localhost:5000/login', {...credentials}, config)
        .then(response =>{
            const {msg, _doc} = response.data;

            if(msg==='Success'){
                dispatch({type: 'LOGIN_SUCCESS', uid: _doc._id});
            }

            else{
                alert(msg);
            }
        });   
    }
}

export const signUp = (credentials) =>{
    return (dispatch) =>{
        const config={headers: {'content-type': 'application/json'}};

        axios.post('http://localhost:5000/signup', {...credentials}, config).then(response =>{
            const {msg, _doc} = response.data;

            if(msg === 'Success'){
                dispatch({type: 'LOGIN_SUCCESS', uid: _doc._id});
            }

            else{
                alert(msg);
            }
        });
    }
}

