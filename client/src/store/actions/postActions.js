import axios from 'axios';

export const createPost = (uid, content) =>{
    return (dispatch) =>{
        const config = {headers: {'content-type': 'application/json'}};

        axios.post('http://localhost:5000/posts/create', {uid, content}, config).then(response =>{
            dispatch({type: "POSTS_UPDATED", posts: response.data});
        });
    }
}

export const getFeedPosts = () =>{
    return (dispatch) =>{
        axios.get('http://localhost:5000/posts').then(response => {
            dispatch({type: "POSTS_UPDATED", posts: response.data});
        });
    }
}

export const getProfilePosts = (profileId) =>{
    return (dispatch) =>{
        
    }
}

export const deletePost = (id) => {
    return (dispatch) =>{
        axios.delete(`http://localhost:5000/posts/${id}`).then(response => {
            dispatch({type: "POSTS_UPDATED", posts: response.data});
        });
    }
}