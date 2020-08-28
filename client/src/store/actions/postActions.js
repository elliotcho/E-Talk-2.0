import axios from 'axios';

export const getFeedPosts = (uid) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/posts/feed/${uid}`);
        const posts = response.data;

        dispatch({type: "LOAD_POSTS", posts});
    }
}

export const getProfilePosts = (uid, profileId) =>{
    return async (dispatch) =>{
        const config = {headers: {'content-type': 'application/json'}};

        const response = await axios.post('http://localhost:5000/posts/profile', {uid, profileId}, config);
        const posts = response.data;

        dispatch({type: "LOAD_POSTS", posts});
    }
}

export const createPost = (uid, content) =>{
    return async (dispatch) =>{
        const config = {headers: {'content-type': 'application/json'}};

        const response = await axios.post('http://localhost:5000/posts/create', {uid, content}, config);
        const newPost = response.data;

        dispatch({type: 'CREATE_POST', newPost});
    }
}

export const deletePost = (postId) => {
    return async (dispatch) =>{
        await axios.delete(`http://localhost:5000/posts/${postId}`);
        
        dispatch({
            type: 'DELETE_POST', 
            postId
        });
    }
}

export const deleteFromPostDetails = (postId) =>{
    return async () =>{
        await axios.delete(`http://localhost:5000/posts/${postId}`);
    }
}

export const getPost = async (postId) =>{
    const response = await axios.get(`http://localhost:5000/posts/${postId}`); 
    return response.data;
}