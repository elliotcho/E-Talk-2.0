import axios from 'axios';

export const createPost = (uid, content) =>{
    return (dispatch) =>{
        const config = {headers: {'content-type': 'application/json'}};

        axios.post('http://localhost:5000/posts/create', {uid, content}, config).then(response =>{
            dispatch({type: "POST_CREATED", posts: response.data});
        });
    }
}

export const getPosts = () =>{
    return (dispatch) =>{
        axios.get('http://localhost:5000/posts').then(response => {
            dispatch({type: "POSTS_LOADED", posts: response.data});
        });
    }
}

export const deletePost = (id) => {
    return (dispatch) =>{
        axios.delete(`http://localhost:5000/posts/${id}`).then(response => {
            dispatch({type: "POST_DELETED", posts: response.data});
        });
    }
}

