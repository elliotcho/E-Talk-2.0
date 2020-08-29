import axios from 'axios';

export const getPost = async (postId) =>{
    const response = await axios.get(`http://localhost:5000/posts/${postId}`); 
    return response.data;
}

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

export const deletePostFromList = (postId) => {
    return async (dispatch) =>{
        await axios.delete(`http://localhost:5000/posts/${postId}`);
        
        dispatch({
            type: 'DELETE_POST', 
            postId
        });
    }
}

export const deleteFromPostDetails = async (postId) =>{
    await axios.delete(`http://localhost:5000/posts/${postId}`);
}


export const checkIfUserLiked = async (uid, postId) =>{
    const config = {headers: {'content-type': 'application/json'}};

    const response = await axios.post('http://localhost:5000/posts/userliked', {uid, postId}, config);
    const {userLiked} = response.data;

    return userLiked;
}

export const handleLike = async (uid, postId, userLiked) =>{
    const config = {headers: {'content-type': 'application/json'}};

    const data = {
        uid, 
        postId, 
        userLiked: !userLiked
    };

    await axios.post('http://localhost:5000/posts/like', data , config);
}

export const createComment = async (postId, uid, content) =>{
    const config = {headers: {'content-type': 'application/json'}};

    const data = {postId, uid, content};

    const response =  await axios.post('http://localhost:5000/posts/comment',  data , config);
    return response.data;
}

export const deleteComment = async (postId, commentId) =>{
    const config = {headers: {'content-type': 'application/json'}};

    const data = {postId, commentId};

    const response =  await axios.post('http://localhost:5000/posts/deletecomment', data, config);
    return response.data;
}