import axios from 'axios';

export const getPosts = (uid, profileId = "empty") =>{
    return (dispatch) =>{
        const config = {headers: {'content-type': 'application/json'}};

        axios.post('http://localhost:5000/posts', {uid, profileId}, config).then(response => {
            dispatch({type: "POSTS_UPDATED", posts: response.data});
        });
    }
}

export const createPost = (uid, content, profileId = "empty") =>{
    return (dispatch) =>{
        const config = {headers: {'content-type': 'application/json'}};

        axios.post('http://localhost:5000/posts/create', {uid, content}, config).then(() =>{
            axios.post('http://localhost:5000/posts', {uid, profileId}, config).then(response => {
                dispatch({type: "POSTS_UPDATED", posts: response.data});
            });
        });
    }
}

export const deletePost = (uid, postId, profileId = "empty") => {
    return (dispatch) =>{
        const config = {headers: {'content-type': 'application/json'}};

        axios.delete(`http://localhost:5000/posts/${postId}`).then( () => {
            axios.post('http://localhost:5000/posts', {uid, profileId}, config).then(response => {
                dispatch({type: "POSTS_UPDATED", posts: response.data});
            });
        });
    }
}