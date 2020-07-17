import axios from 'axios';

export const getPosts = (profileId = "empty") =>{
    return (dispatch) =>{
        axios.get(`http://localhost:5000/posts/${profileId}`).then(response => {
            dispatch({type: "POSTS_UPDATED", posts: response.data});
        });
    }
}

export const createPost = (uid, content, profileId = "empty") =>{
    return (dispatch) =>{
        const config = {headers: {'content-type': 'application/json'}};

        axios.post('http://localhost:5000/posts/create', {uid, content}, config).then(() =>{
            axios.get(`http://localhost:5000/posts/${profileId}`).then(response => {
                dispatch({type: "POSTS_UPDATED", posts: response.data});
            });
        });
    }
}

export const deletePost = (postId, profileId = "empty") => {
    return (dispatch) =>{
        axios.delete(`http://localhost:5000/posts/${postId}`).then( () => {
            axios.get(`http://localhost:5000/posts/${profileId}`).then(response => {
                dispatch({type: "POSTS_UPDATED", posts: response.data});
            });
        });
    }
}